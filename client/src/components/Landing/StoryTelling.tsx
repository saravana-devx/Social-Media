import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import post from "@/assets/LandingPage/videos/istockphoto-1435126980-640_adpp_is.mp4";
import live from "@/assets/LandingPage/videos/26774-361091997_tiny.mp4";


const defaultStory = [
    {
        id: "g1",
        headline: "Create Stunning Posts, Share Stories, Go Live & Explore Creative Features",
        text: {
            t1: "✍️ Create stunning posts to share your moments, updates, ideas, polls, and stories with the world in a visually engaging way.",
            t2: "🎥 Go live anytime to engage with your community in real-time, host Q&A sessions, showcase your creativity, invite viewers to interact with polls, reactions, and live comments, and discover new trends.",
        },
        video: post,
    },
    {
        id: "g2",
        headline: "Chat, Connect, Call, Share Moments & Collaborate Anywhere",
        text: {
            t1: "💬 Stay connected through private or group chats, send emojis, GIFs, media files, collaborate on shared notes, and create fun chat threads instantly.",
            t2: "📞 Enjoy crystal-clear voice and video calls with friends and family, host group calls, share live reactions, use screen sharing for collaborative sessions, and discover interactive features.",
        },
        video: live,
    },
    {
        id: "g3",
        headline: "Express Reactions, Join Communities, Discover Content & Engage Creatively",
        text: {
            t1: "👍 Express yourself with reactions, likes, comments, interactive polls, and badges on posts from friends, creators, and trending content.",
            t2: "👥 Join communities, participate in discussions, attend virtual events, collaborate in challenges, and connect with people who share your passions, hobbies, and interests.",
        },
        video: post,
    },
    {
        id: "g4",
        headline: "Share Stories, Explore Feeds, Personalize Experience & Discover Trending Content",
        text: {
            t1: "📢 Share fun, creative, ephemeral moments with stories that disappear in 24 hours, add interactive stickers, filters, and keep your audience engaged.",
            t2: "📰 Enjoy a personalized feed that adapts to your interests, discovers trending content, recommends new creators, features AI suggestions, and keeps you inspired daily.",
        },
        video: live,
    },
];

export default function ScrollStorytelling({ story = defaultStory }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const [pausedStates, setPausedStates] = useState<boolean[]>(Array(story.length).fill(true));

    const toggleVideo = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            if (video.paused) {
                video.play();
                setPausedStates(prev => prev.map((v, i) => (i === index ? false : v)));
            } else {
                video.pause();
                setPausedStates(prev => prev.map((v, i) => (i === index ? true : v)));
            }
        }
    };


    return (
        <div className="mt-8 w-full max-w-6xl mx-auto relative px-4 md:px-8 hidden sm:block select-none">
            <img
                src="https://stackbros.in/social/assets/images/elements/07.svg"
                className="hidden md:block -left-[32rem] top-0 absolute w-[32rem] h-[32rem] blur-[254px]"
                alt=""
            />
            <img
                src="https://stackbros.in/social/assets/images/elements/07.svg"
                className="hidden md:block -left-[32rem] bottom-0 absolute w-[32rem] h-[32rem] blur-[254px]"
                alt=""
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-[20vh] lg:space-y-[60vh]">
                    {story.map((scene, i) => {
                        const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });

                        if (inView && activeIndex !== i) setActiveIndex(i);

                        return (
                            <motion.div
                                key={scene.id}
                                ref={ref}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
                                transition={{ duration: 0.6 }}
                                className="min-h-[60vh] flex flex-col justify-center"
                            >
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-blue-500">{scene.headline}</h2>
                                <div className="text-base md:text-lg leading-relaxed space-y-2">
                                    <p>{scene.text.t1}</p>
                                    <p>{scene.text.t2}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Right: Fixed Media (Hidden on Mobile) */}
                <div className="relative">
                    <div className="sticky top-20 lg:top-24">
                        <div className="relative w-full max-h-[500px] flex justify-center items-center">
                            <AnimatePresence mode="wait">
                                {story[activeIndex].video && (
                                    <div className="relative w-full">
                                        <img
                                            src="https://stackbros.in/social/assets/images/elements/06.svg"
                                            className="hidden md:block -z-10 -right-[18rem] top-0 absolute w-[32rem] h-[32rem] blur-[154px]"
                                            alt=""
                                        />
                                        <motion.video
                                            ref={(el) => {
                                                videoRefs.current[activeIndex] = el;
                                            }}
                                            key={story[activeIndex].video}
                                            src={story[activeIndex].video}
                                            autoPlay
                                            loop
                                            muted
                                            className="w-full max-h-[500px] object-cover rounded-2xl shadow-lg"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8 }}
                                        />
                                        <button
                                            onClick={() => toggleVideo(activeIndex)}
                                            className="absolute inset-0 m-auto w-16 h-16 bg-green-500 rounded-full text-white flex justify-center items-center opacity-0 hover:opacity-100"
                                        >
                                            {pausedStates[activeIndex] ? "▶" : "❚❚"}
                                        </button>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


