import React from "react";

const links = [
    {
        heading: "Download",
        items: ["Web Browser", "Windows", "macOS", "iOS & Android"],
    },
    {
        heading: "About",
        items: ["About Social", "Security", "Customer Support", "Partner", "Careers"],
    },
    {
        heading: "Resources",
        items: ["Join", "Help Center", "Developers", "Status", "Communities"],
    },
];

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 pt-20 text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 ">
                {links.map((link) => (
                    <div key={link.heading} className="space-y-3">
                        <h2 className="text-lg font-semibold text-blue-600">{link.heading}</h2>
                        <ul className="space-y-1">
                            {link.items.map((item) => (
                                <li key={item} className="hover:text-blue-500 cursor-pointer">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <hr className="my-6 border-gray-300" />

            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-6 pb-6">
                <div className="flex flex-wrap justify-center sm:justify-start gap-6">
                    <p className="hover:text-blue-500 cursor-pointer">Support</p>
                    <p className="hover:text-blue-500 cursor-pointer">Terms of Use</p>
                    <p className="hover:text-blue-500 cursor-pointer">Privacy & Terms</p>
                </div>
                <div className="text-gray-500 text-sm text-center sm:text-right">
                    &copy; {currentYear} StackBros. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
