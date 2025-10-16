import React from "react";
import {
    Marquee,
    MarqueeContent,
    MarqueeFade,
    MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import { cn } from "@/lib/utils";

// ------------------- ReviewCard -------------------
interface ReviewCardProps {
    img: string;
    name: string;
    username: string;
    body: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ img, name, username, body }) => (
    <figure
        className={cn(
            "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 flex flex-col",
            "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800",
            "transition-all duration-300"
        )}
    >
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
            <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
                <figcaption className="text-sm font-medium text-gray-900 dark:text-white">{name}</figcaption>
                <span className="text-xs text-gray-500 dark:text-gray-400">{username}</span>
            </div>
        </div>

        <blockquote className="text-sm text-gray-700 dark:text-gray-200">"{body}"</blockquote>
    </figure>
);

const reviews: ReviewCardProps[] = Array.from({ length: 14 }).map((_, i) => ({
    name: `User ${i + 1}`,
    username: `@user${i + 1}`,
    body: "This platform is amazing! I love how easy it is to connect with others.",
    img: `https://i.pravatar.cc/150?img=${i + 10}`, // random avatars
}));

// Divide reviews into two equal parts
const half = Math.ceil(reviews.length / 2);
const firstRowReviews = reviews.slice(0, half);
const secondRowReviews = reviews.slice(half);


const TestimonialMarquee: React.FC = () => {
    return (
        <section className="relative select-none w-full py-16 bg-background flex flex-col gap-12">
            {/* First Row */}
            <Marquee className="[--duration:20s]">
                <MarqueeFade side="left" />
                <MarqueeFade side="right" />
                <MarqueeContent className="flex gap-6">
                    {firstRowReviews.map((review, index) => (
                        <MarqueeItem key={index} className="w-64">
                            <ReviewCard {...review} />
                        </MarqueeItem>
                    ))}
                </MarqueeContent>
            </Marquee>

            {/* Second Row (Reverse) */}
            <Marquee className="[--duration:20s] marquee-reverse">
                <MarqueeFade side="left" />
                <MarqueeFade side="right" />
                <MarqueeContent className="flex gap-6">
                    {secondRowReviews.map((review, index) => (
                        <MarqueeItem key={index + "-2"} className="w-64">
                            <ReviewCard {...review} />
                        </MarqueeItem>
                    ))}
                </MarqueeContent>
            </Marquee>
        </section>
    );
};

export default TestimonialMarquee;
