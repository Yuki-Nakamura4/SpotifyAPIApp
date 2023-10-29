from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

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
        "E/♯m",
        "F/Dm",
        "G♭/D♯m",
        "G/Em",
        "A♭/Fm",
        "A/F#m",
        "B♭/Gm",
        "B/G#m",
    ]
    return key_names[key_sig_num]


import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


@app.get("/search_artist/")
def search_artist(artist: str = Query(..., title="アーティスト名")):
    sp = spotipy.Spotify(
        auth_manager=SpotifyClientCredentials(
            client_id="55015e2f1db8470598bdf29820394b4d",
            client_secret="cf89f0147a434f2781ade857215287e0",
        )
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
