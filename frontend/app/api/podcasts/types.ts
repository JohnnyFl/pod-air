export interface Heatmap {
    start_time: number
    end_time: number
    value: number
}

export interface Word {
    word: string
    start: number
    end: number
}

export interface Segments {
    id: number
    text: string
    start: number
    end : number
    words: Word[]
}

export interface Podcast {
    categories: string[]
    channel_id: string
    created_at: string
    duration: string
    heatmap: Heatmap[]
    id: string
    segments: Segments[]
    tags: string[]
    transcription: string
    thumbnail: string
    title: string
    upload_date: string
    url: string
}

export interface UsersPodcastsInfo {
    podcast_id: string
    thumbnail: string
    channel_title: string
    podcast_title: string
    created_at: Date
}

// export interface PodcastSummary {
//     summary: string
// }

// export interface PodcastHighlights {
//     highlights: string
// }
//
// export type Quotes = {
//     quotes: string
// }