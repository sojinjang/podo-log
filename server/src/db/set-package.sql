insert into
    user(userId, email, password, nickname, role)
values
    (
        1,
        "admin@test.com",
        "$2b$10$oCYLyg.ukI6E9DfT4SAYl.vR7OB39S8OrqB5dRknx3C0cAjN5nUmO",
        "admin",
        "admin"
    );

insert into
    package(packageId, packageName, podoPrice)
values
    (1, "emoji", 0);

insert into
    sticker(packageId, stickerName, stickerImg)
values
    (
        1,
        "confused",
        "packages/emoji/confused.png"
    ),
    (
        1,
        "confusion",
        "packages/emoji/confusion.png"
    ),
    (
        1,
        "crying",
        "packages/emoji/crying.png"
    ),
    (
        1,
        "deadskin",
        "packages/emoji/deadskin.png"
    ),
    (
        1,
        "detective",
        "packages/emoji/detective.png"
    ),
    (
        1,
        "hug",
        "packages/emoji/hug.png"
    ),
    (
        1,
        "nervous",
        "packages/emoji/nervous.png"
    ),
    (
        1,
        "sad",
        "packages/emoji/sad.png"
    ),
    (
        1,
        "sadface",
        "packages/emoji/sadface.png"
    ),
    (
        1,
        "superstar",
        "packages/emoji/superstar.png"
    ),
    (
        1,
        "tongueout",
        "packages/emoji/tongueout.png"
    );