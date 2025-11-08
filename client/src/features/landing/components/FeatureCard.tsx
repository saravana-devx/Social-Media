import { motion, type Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rss, Users, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cardVariants: Variants = {
  offscreen: { y: 150, opacity: 0 },
  onscreen: (i: number) => ({
    y: 0,
    opacity: 1,
    rotate: i === 0 ? -2 : i === 1 ? 0 : 2,
    transition: { type: 'spring', bounce: 0.3, duration: 1.2, delay: i * 0.2 },
  }),
};

const fadeUp: Variants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const cards = [
  {
    icon: Rss,
    title: 'Real-Time Feed',
    description: 'Catch the latest posts, photos, and stories from your friends and communities instantly.',
  },
  {
    icon: Users,
    title: 'Groups & Communities',
    description: 'Discover and join groups that match your passions, or start your own to bring people together.',
  },
  {
    icon: Shield,
    title: 'Privacy & Control',
    description: "You're in charge—customize who can see your content and how your data is shared.",
  },
];

const features = [
  {
    icon: Shield,
    title: 'Safer Communities',
    description: "We're committed to creating a secure space where you can connect, share, and engage without worrying about unwanted content or harmful behavior.",
  },
  {
    icon: Users,
    title: 'Genuine Users',
    description: 'Our platform prioritizes real people—authentic profiles that foster trust, meaningful conversations, and stronger online connections.',
  },
  {
    icon: Sparkles,
    title: 'Stronger Communities',
    description: "Join groups that empower you to learn, grow, and collaborate. Whether it's a hobby, a cause, or a passion, communities here thrive together.",
  },
];

export default function FeatureSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full lg:w-4/5 mx-auto mt-16 px-4 select-none">
      <motion.div
        className="text-center mb-12"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">More than messaging</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Express yourself and connect with others in meaningful ways
        </p>
      </motion.div>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16">
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
            <Card className="p-8 w-full border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center text-center space-y-4 p-0">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-lg">
                  <card.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="w-full mt-16 mb-16 flex flex-col md:flex-row items-center gap-8"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
      >
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Take a look at our big set of features
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Connecting, sharing, and growing online has never been easier with our comprehensive suite of tools.
          </p>
          <Button
            onClick={() => navigate('/stories')}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </Button>
        </div>

        <motion.div
          className="w-full md:w-1/2 bg-gradient-to-br from-card to-card/50 border-2 border-border rounded-3xl p-10 shadow-2xl backdrop-blur-sm"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        >
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 w-fit shadow-lg">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h4 className="text-3xl font-bold">Smart Recommendations</h4>
            <p className="text-muted-foreground leading-relaxed">
              Discover content, groups, and people tailored to your interests with our intelligent recommendation system powered by advanced algorithms.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="w-full mt-16 grid gap-8 md:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-br from-card to-card/50 border-2 border-border p-10 rounded-3xl hover:border-primary transition-all duration-300 hover:shadow-2xl backdrop-blur-sm group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.2 } }}
            viewport={{ once: true }}
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 w-fit mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <feature.icon className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-2xl font-bold mb-3">{feature.title}</h4>
            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
