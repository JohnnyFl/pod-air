import { createClient } from '@/utils/supabase/server'
import { Podcast, PodcastHighlights, PodcastSummary } from './types'

const API_PODCAST_MANAGER_URL = 'http://localhost:8082/api'

async function getAuthHeaders() {
    const supabase = await createClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()
    
    if (!session) {
        throw new Error('Not authenticated')
    }

    return {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
    }
}

export async function getPodcast(podcastId: string): Promise<Podcast> {
    try {
        const headers = await getAuthHeaders()
        const response = await fetch(
            `${API_PODCAST_MANAGER_URL}/podcasts/${podcastId}`,
            {
                method: 'GET',
                headers,
            }
        )
        
        if (!response.ok) {
            throw new Error('Failed to fetch podcast')
        }
        
        return await response.json()
    } catch (error) {
        console.error('Error fetching podcast:', error)
        throw error
    }
}

export async function getPodcastSummary(podcastId: string): Promise<string> {
    try {
        const headers = await getAuthHeaders()
        const response = await fetch(
            `${API_PODCAST_MANAGER_URL}/podcasts/${podcastId}/summary`,
            {
                method: 'GET',
                headers,
            }
        )
        
        if (!response.ok) {
            throw new Error('Failed to fetch podcast summary')
        }
        
        return await response.json()
    } catch (error) {
        console.error('Error fetching podcast summary:', error)
        throw error
    }
}

export async function getAllPodcasts(): Promise<Podcast[]> {
    try {
        const headers = await getAuthHeaders()
        const response = await fetch(
            `${API_PODCAST_MANAGER_URL}/podcasts`,
            {
                method: 'GET',
                headers,
            }
        )
        
        if (!response.ok) {
            throw new Error('Failed to fetch podcasts')
        }
        
        return await response.json()
    } catch (error) {
        console.error('Error fetching podcasts:', error)
        throw error
    }
}

export async function getPodcastHighlights(podcastId: string): Promise<string> {
    try {
        const headers = await getAuthHeaders()
        const response = await fetch(
            `${API_PODCAST_MANAGER_URL}/podcasts/${podcastId}/highlights`,
            {
                method: 'GET',
                headers,
            }
        )
        
        if (!response.ok) {
            throw new Error('Failed to fetch podcast highlights')
        }
        
        return await response.json()
    } catch (error) {
        console.error('Error fetching podcast highlights:', error)
        throw error
    }
}

export async function getPodcastQuotes(podcastId: string): Promise<string> {
    try {
        const headers = await getAuthHeaders()
        const response = await fetch(
            `${API_PODCAST_MANAGER_URL}/podcasts/${podcastId}/quotes`,
            {
                method: 'GET',
                headers,
            }
        )
        
        if (!response.ok) {
            throw new Error('Failed to fetch podcast quotes')
        }
        
        return await response.json()
    } catch (error) {
        console.error('Error fetching podcast quotes:', error)
        throw error
    }
}