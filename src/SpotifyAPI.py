def key_number_to_name(key_sig_num):
    key_names = [
        "C/Am",
        "D♭/B♭m",
        "D/Bm",
        "E♭/Cm",
        "E/C♯m",
        "F/Dm",
        "F#/D♯m",
        "G/Em",
        "A♭/Fm",
        "A/F#m",
        "B♭/Gm",
        "B/G♯m",
    ]
    return key_names[key_sig_num]


import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

artist = "ちかるとふ"

sp = spotipy.Spotify(
    auth_manager=SpotifyClientCredentials(
        client_id="55015e2f1db8470598bdf29820394b4d",
        client_secret="cf89f0147a434f2781ade857215287e0",
    )
)

results = sp.search(q=artist)
for idx, track in enumerate(results["tracks"]["items"]):
    print(f"{idx}: {track['name']}")

    # トラックのSpotify IDを取得
    track_id = track["id"]

    result = sp.audio_features(track_id)

    # キー情報を表示
    if result and "key" in result[0]:
        key_number = result[0]["key"]
        mode_number = result[0]["mode"]
        # 調号の数値を計算する
        if mode_number == 1:  # modeの値が長調の場合
            key_sig_num = key_number
        elif mode_number == 0:  # modeの値が短調の場合
            key_sig_num = (key_number - 9) % 12
        key_name = key_number_to_name(key_sig_num)
        print(f" Key: {key_name}")
    else:
        print(" キー情報が提供されていません")
