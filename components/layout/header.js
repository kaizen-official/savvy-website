import CardNav from '../ui/cardNav'

export default function Header() {
    const items = [
        {
            label: "About",
            bgColor: "#000000",
            textColor: "#fff",
            links: [
                { label: "Our Story", ariaLabel: "About Company", href: "/about" },
                { label: "Careers", ariaLabel: "About Careers", href: "/careers" }
            ]
        },
        {
            label: "Services",
            bgColor: "#000000",
            textColor: "#fff",
            links: [
                { label: "Featured", ariaLabel: "Featured Services", href: "/services" },
                { label: "Drive With Us", ariaLabel: "Drive With Us", href: "/driving" }
            ]
        },
        {
            label: "Contact",
            bgColor: "#000000",
            textColor: "#fff",
            links: [
                { label: "Book a Journey", ariaLabel: "Book a Car", href: "/booking" },
                { label: "Contact Us", ariaLabel: "Contact Us", href: "/contact" }
            ]
        }
    ];

    return (
        <CardNav
            logo="/logo.png"
            logoAlt="Company Logo"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
            theme="light"
        />
    );
};