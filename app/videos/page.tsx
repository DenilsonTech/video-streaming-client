"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import Hls from "hls.js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock } from "lucide-react"
import { Header } from "@/components/Header/Header"

interface Video {
    id: number
    title: string
    description: string
    file_path: string
    uploaded_at: string
}

const Videos = () => {
    const [videos, setVideos] = useState<Video[]>([])
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/videos")
                setVideos(response.data)
                if (response.data.length > 0) {
                    setSelectedVideo(response.data[0])
                }
            } catch (error) {
                console.error("Failed to fetch videos", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchVideos()
    }, [])

    const setupVideoPlayer = (videoElement: HTMLVideoElement, streamPath: string) => {
        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(`http://localhost:3000/stream/${streamPath}`)
            hls.attachMedia(videoElement)
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
            videoElement.src = `http://localhost:3000/stream/${streamPath}`
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };

        return date.toLocaleString("en-US", options);
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>{selectedVideo ? selectedVideo.title : "Select a video"}</CardTitle>
                            {selectedVideo && (
                                <CardDescription className="flex items-center space-x-4">
                                    <span className="flex items-center">
                                        <Calendar className="mr-1 h-4 w-4" />
                                        {formatDate(selectedVideo.uploaded_at)}
                                    </span>
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            {selectedVideo ? (
                                <>
                                    <video
                                        ref={(video) => {
                                            if (video) setupVideoPlayer(video, selectedVideo.file_path)
                                        }}
                                        controls
                                        className="w-full aspect-video rounded-lg shadow-lg"
                                    ></video>
                                    <p className="mt-4 text-gray-600">{selectedVideo.description}</p>
                                </>
                            ) : (
                                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                                    No video selected
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Video Playlist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[calc(100vh-20rem)]">
                                {isLoading
                                    ? Array(5)
                                        .fill(0)
                                        .map((_, index) => (
                                            <div key={index} className="flex items-center space-x-4 mb-4">
                                                <Skeleton className="h-12 w-12 rounded" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-[200px]" />
                                                    <Skeleton className="h-4 w-[160px]" />
                                                </div>
                                            </div>
                                        ))
                                    : videos.map((video) => (
                                        <div
                                            key={video.id}
                                            onClick={() => setSelectedVideo(video)}
                                            className={`cursor-pointer p-2 rounded-lg mb-2 transition-colors ${selectedVideo?.id === video.id ? "bg-blue-100" : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <h3 className="font-semibold truncate">{video.title}</h3>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {formatDate(video.uploaded_at)}
                                            </p>
                                        </div>
                                    ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default Videos

