**TwitterAPIの仕様変更によりリリースできず**

# Victo

## 概要

Vtuberファンアート閲覧サービス

- Vtuberのファンアートタグをユーザがフォロー
- フォローしているタグのファンアートを楽に閲覧できる

## 背景

- Vtuberのファンアートは各々のハッシュタグをつける文化がある
  - ex. 月ノ美兎のファンアートタグ: `#みとあーと`
- Vtuberを複数推しているファンが多い
- 複数のファンアートタグを楽に見ることができるようにしたい


## システム構成

![arch_victo](https://github.com/tmp-friends/victo/assets/52572364/48028435-f209-439f-9a1c-5bce3a70597e)

- [victo](https://github.com/tmp-friends/victo)
  - TypeScript
    - Next.js
- [victo-api](https://github.com/tmp-friends/victo-api)
  - Go
    - echo
    - SQLBoiler
    - golang-migrate
- [victo-batch](https://github.com/tmp-friends/victo-batch)
  - Go

- DB: PlanetScale


## テーブル

![ER_victo](https://github.com/tmp-friends/victo/assets/52572364/0cf0dd0e-f1a2-4785-8adc-c1db46087e28)
