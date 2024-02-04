import os
import random
from dotenv import load_dotenv
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

# spotipyはSpotifyAPIをPythonで利用するためのライブラリ
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# .env ファイルから環境変数を読み込む
load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
]

# CORSミドルウェアを追加して、クロスオリジンリクエストを許可する
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ローカル環境での開発時のみ許可
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 引数として与えられた数値(key_sig_num)を調の名前(key_names)に変換する関数
def key_number_to_name(key_sig_num):
    key_names = [
        "C/Am",
        "D♭/B♭m",
        "D/Bm",
        "E♭/Cm",
        "E/C♯m",
        "F/Dm",
        "G♭/D♯m",
        "G/Em",
        "A♭/Fm",
        "A/F♯m",
        "B♭/Gm",
        "B/G♯m",
    ]
    return key_names[key_sig_num]


# 楽曲を検索するAPI
# @app.getはFastAPIのデコレータで、HTTP GETリクエストに対応するエンドポイント(APIの特定のURL)を定義する
@app.get("/search_artist/")
def search_artist(artist: str = Query(..., title="アーティスト名")):
    sp = spotipy.Spotify(
        auth_manager=SpotifyClientCredentials(
            # 環境変数から読み込む
            client_id=os.getenv("SPOTIFY_CLIENT_ID"),
            client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
        ),
        language="ja",
    )

    # アーティスト名を指定して楽曲を検索
    # SpotifyAPIから最大50曲取得可能
    results = sp.search(q=artist, limit=50)
    response_data = []

    for track in results["tracks"]["items"]:
        track_name = track["name"]
        track_id = track["id"]
        result = sp.audio_features(track_id)

        if result and "key" in result[0]:
            key_number = result[0]["key"]
            mode_number = result[0]["mode"]
            if mode_number == 1:
                key_sig_num = key_number
            elif mode_number == 0:
                key_sig_num = (key_number - 9) % 12
            key_name = key_number_to_name(key_sig_num)
            response_data.append({"曲名": track_name, "キー": key_name})
        else:
            response_data.append(
                {"曲名": track_name, "キー": "キー情報が提供されていません"}
            )

    return response_data


# アーティスト名の候補を検索するAPI
# 指定した文字列からアーティスト名の候補とそのアーティストのIDを取得する
@app.get("/get_artists_name/")
def get_artists_name(artist: str = Query(..., title="アーティスト名")):
    sp = spotipy.Spotify(
        auth_manager=SpotifyClientCredentials(
            # 環境変数から読み込む
            client_id=os.getenv("SPOTIFY_CLIENT_ID"),
            client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
        ),
        language="ja",
    )

    results = sp.search(q=artist, type="artist", limit=4)
    response_data = []

    for artist in results["artists"]["items"]:
        response_data.append({"name": artist["name"], "id": artist["id"]})

    return response_data


@app.get("/get_songs_by_artist/")
# アーティストIDを指定してそのアーティストの楽曲を取得するAPI
def get_songs_by_artist(artist_id: str = Query(..., title="アーティストID")):
    sp = spotipy.Spotify(
        auth_manager=SpotifyClientCredentials(
            # 環境変数から読み込む
            client_id=os.getenv("SPOTIFY_CLIENT_ID"),
            client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
        ),
        language="ja",
    )

    # アーティストのアルバムを取得
    albums = sp.artist_albums(artist_id, album_type="album")

    response_data = []

    for album in albums["items"]:
        tracks = sp.album_tracks(album["id"])

        # 各曲の曲名とキーをクライアントに返すデータに追加
        for track in tracks["items"]:
            track_name = track["name"]
            track_id = track["id"]
            result = sp.audio_features(track_id)

            # キー情報が提供されている場合
            if result and "key" in result[0]:
                key_number = result[0]["key"]
                mode_number = result[0]["mode"]
                # 長調の場合はそのままキー番号を設定
                if mode_number == 1:
                    key_sig_num = key_number
                # 短調の場合はキー番号から9を引いて12で割った余りを設定
                # たとえばヘ短調の場合は5-9=-4を12で割った余りは8なのでキー番号は8
                # キー番号8は変イ長調なのでキー名はA♭/Fm
                # SpotifyAPIのkeyは主音で判定している(ヘ長調もヘ短調もkey=5となってしまう)ため、
                # mode(長調か短調かを示す値)を合わせて考慮することで正確な調を区別できるようになる
                elif mode_number == 0:
                    key_sig_num = (key_number - 9) % 12
                key_name = key_number_to_name(key_sig_num)
                response_data.append({"曲名": track_name, "キー": key_name})
            else:
                response_data.append(
                    {"曲名": track_name, "キー": "キー情報が提供されていません"}
                )

    return response_data


@app.get("/get_random_artists/")
def get_random_artists(popularity_threshold=50, num_artists=4):
    sp = spotipy.Spotify(
        auth_manager=SpotifyClientCredentials(
            client_id=os.getenv("SPOTIFY_CLIENT_ID"),
            client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
        ),
        language="ja",
    )

    # 日本のアーティストを検索するためのクエリ
    japan_query = "genre:j-pop"  # Include country filter

    # 日本のアーティストを検索
    results = sp.search(q=japan_query, type="artist", limit=50, market="JP")
    japanese_artists = results["artists"]["items"]

    # 一定以上の人気を持つアーティストをフィルタリング
    popular_japanese_artists = [
        artist
        for artist in japanese_artists
        if artist["popularity"] >= popularity_threshold
    ]

    # ランダムに num_artists 個のアーティストを選択
    random_artists = random.sample(
        popular_japanese_artists, min(num_artists, len(popular_japanese_artists))
    )

    # 名前とIDだけを抽出して返す
    result_list = [
        {"name": artist["name"], "id": artist["id"]} for artist in random_artists
    ]

    return result_list


if __name__ == "__main__":
    print(get_random_artists())
