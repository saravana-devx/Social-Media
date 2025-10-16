import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { HiOutlineUsers } from "react-icons/hi";
import { FcCustomerSupport } from "react-icons/fc";
import { CgCommunity } from "react-icons/cg";
import { LiaDownloadSolid } from "react-icons/lia";

const statsVariants: Variants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: { type: 'spring', bounce: 0.3, duration: 0.8, delay: i * 0.2 },
    }),
};

const StatsSection = () => {
    const data = [
        { id: 1, title: "Active Users", description: "400,000", icon: <HiOutlineUsers /> },
        { id: 2, title: "Downloads", description: "150,000", icon: <LiaDownloadSolid /> },
        { id: 3, title: "Communities", description: "2,500", icon: <CgCommunity /> },
        { id: 4, title: "Customer Support", description: "24/7", icon: <FcCustomerSupport /> },
    ];

    return (
        <section className="w-full py-16 md:w-2/3 mx-auto select-none">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
                viewport={{ once: true }}
            >
                <h1 className="text-3xl md:text-4xl font-bold">We Speak With Numbers</h1>
                <p className="text-gray-600 mt-2">
                    Our platform's growth and impact speak for themselves.
                </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {data.map((info, i) => (
                    <motion.div
                        key={info.id}
                        className=" p-6 rounded-3xl  flex flex-col items-center w-52"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.6 }}
                        custom={i}
                        variants={statsVariants}
                    >
                        <p className='text-4xl h-12 bg-gray-50 p-4 rounded-full flex items-center text-blue-400'>{info.icon}</p>
                        <h2 className="text-3xl font-bold mb-2">{info.description}</h2>
                        <p className="text-gray-600">{info.title}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
