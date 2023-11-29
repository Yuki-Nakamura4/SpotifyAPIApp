import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def Hello():
    return {"Hello": "World!"}


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
            response_data.append({"曲名": track_name, "キー": "キー情報が提供されていません"})

    return response_data


# アーティスト名の候補を検索するAPI
# 指定した文字列からアーティスト名の候補とそのアーティストのIDを取得する
@app.get("/get_artists_name/")
def get_artists_name(artist: str = Query(..., title="アーティスト名")):
    sp = spotipy.Spotify(
        auth_manager=SpotifyClientCredentials(
            client_id="55015e2f1db8470598bdf29820394b4d",
            client_secret="cf89f0147a434f2781ade857215287e0",
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
            client_id="55015e2f1db8470598bdf29820394b4d",
            client_secret="cf89f0147a434f2781ade857215287e0",
        ),
        language="ja",
    )

    # アーティストのアルバムを取得
    albums = sp.artist_albums(artist_id, album_type="album")

    response_data = []

    # 各アルバムに対して
    for album in albums["items"]:
        # アルバムのすべての曲を取得
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
                # modeを合わせて考慮することで長調と短調を区別できるようになる
                elif mode_number == 0:
                    key_sig_num = (key_number - 9) % 12
                key_name = key_number_to_name(key_sig_num)
                response_data.append({"曲名": track_name, "キー": key_name})
            else:
                response_data.append({"曲名": track_name, "キー": "キー情報が提供されていません"})

    return response_data
