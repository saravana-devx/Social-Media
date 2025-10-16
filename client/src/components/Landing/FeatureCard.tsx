import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

import Image1 from "@/assets/LandingPage/icons/realTimeFeed.png";
import Image2 from "@/assets/LandingPage/icons/community.png";
import Image3 from "@/assets/LandingPage/icons/privacy.png";
import holder from "@/assets/LandingPage/Images/Screenshot 2025-09-09 233109.png";
import social from "@/assets/LandingPage/icons/social.png";

const cardVariants: Variants = {
  offscreen: { y: 150, opacity: 0 },
  onscreen: (i: number) => ({
    y: 0,
    opacity: 1,
    rotate: i === 0 ? -3 : i === 1 ? 0 : 3,
    transition: { type: "spring", bounce: 0.3, duration: 1.2, delay: i * 0.2 },
  }),
};

const fadeUp: Variants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const cards = [
  { icon: Image1, title: "Real-Time Feed", description: "Catch the latest posts, photos, and stories from your friends and communities instantly." },
  { icon: Image2, title: "Groups & Communities", description: "Discover and join groups that match your passions, or start your own to bring people together." },
  { icon: Image3, title: "Privacy & Control", description: "You’re in charge—customize who can see your content and how your data is shared." },
];

const data = [
  { icon: "https://stackbros.in/social/assets/images/elements/03.svg", title: "Safer Communities", description: "We’re committed to creating a secure space where you can connect, share, and engage without worrying about unwanted content or harmful behavior." },
  { icon: "https://stackbros.in/social/assets/images/elements/09.svg", title: "Genuine Users", description: "Our platform prioritizes real people—authentic profiles that foster trust, meaningful conversations, and stronger online connections." },
  { icon: "https://stackbros.in/social/assets/images/elements/06.svg", title: "Stronger Communities", description: "Join groups that empower you to learn, grow, and collaborate. Whether it’s a hobby, a cause, or a passion, communities here thrive together." },
];

export default function FeatureSection() {
  return (
    <section className="w-full lg:w-4/5 mx-auto mt-8 select-none">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">More than messaging</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Express besides it present if at an opinion visitor.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="flex justify-center"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.6 }}
            variants={cardVariants}
            custom={i}
          >
            <Card className="p-6 w-full max-w-sm border-none shadow-none bg-transparent">
              <CardContent className="flex flex-col items-center text-center space-y-4">
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 hue-rotate-200"
                  src={card.icon}
                  alt={card.title}
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-500">{card.title}</h3>
                <p className="text-gray-600 text-sm sm:text-md">{card.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="w-11/12 mt-8 mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
      >
        {/* Left: Text */}
        <div className="w-full md:w-[480px] space-y-4 md:space-y-2 p-2 md:p-4 ">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Take a look at our big set of features
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Connecting, sharing, and growing online has never been easier.
          </p>
          <Button className="bg-black px-6 py-4 md:py-5 text-white rounded-xl w-32">
            Sign Up
          </Button>
        </div>

        <motion.div
          className="bg-white flex-1 flex flex-col md:flex-row justify-between px-4 md:px-8 py-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        >
          <div className="w-full md:w-4/5 space-y-3 mb-6 md:mb-0">
            <img className="w-12 h-12 md:w-16 md:h-16" src={social} alt="Smart Recommendations Icon" />
            <h4 className="text-xl md:text-2xl font-semibold text-blue-500">Smart Recommendations</h4>
            <p className="text-gray-600 text-sm md:text-base">
              Discover content, groups, and people tailored to your interests with our
              intelligent recommendation system.
            </p>
          </div>
          <div className="w-full md:w-auto flex justify-center">
            <img
              className="w-full max-w-[300px] md:max-w-[400px] object-contain rounded-lg"
              src={holder}
              alt="App demo"
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="w-full xl:w-4/5 mx-auto mt-12 grid gap-8 md:grid-cols-3">
        {data.map((d, i) => (
          <motion.div
            key={i}
            className="bg-white px-6 py-8 rounded-3xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.2 } }}
            viewport={{ once: true }}
          >
            <img className="w-12 h-12 mb-4" src={d.icon} alt={d.title} />
            <h4 className="text-xl font-semibold mb-2 text-blue-500">{d.title}</h4>
            <p className="text-gray-600">{d.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
