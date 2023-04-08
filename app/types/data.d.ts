// ユーザ
export type User = {
  id: number
  name: string
  email: string
  profile_image_url: string
}

// ツイート
export type Tweet = {
  id: number
  tweet_id: string
  text: string
  retweet_count: number
  like_count: number
  author_id: string
  url: string
  tweeted_at: Date
  created_at: Date
  updated_at: Date
  hashtag_id: number
  media_key: string
  media_url: string
  media_type: string
}

// ハッシュタグ
export type Hashtag = {
  id: number
  name: string
  is_self: boolean
  created_at: Date
  updated_at: Date
  vtuber_id: number
  vtuber_name: string
  belongs_to: string
  profile_image_url: string
  twitter_user_name: string
  channel: string
}

// APIコンテキスト
export type ApiContext = {
  apiRootUrl: string
}
