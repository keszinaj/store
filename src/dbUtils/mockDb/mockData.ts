import {User} from "../../models/user.model";
import {Product} from "../../models/product.model";

export const mockUsers: User[]=[
    User.build({
        name: "Jan",
        surname: "Kowalski",
        email: "jankowal@gmail.com",
        passwordHash: "$argon2i$v=19$m=16,t=2,p=1$YVNERmFzZmc$v7rRXcRmy/RxEmOGecl3gA", //tojesthaslo
        phoneNumber: "123456789",
        birthday:  new Date("1999-01-16"),
        gender: 1,
        country: "Poland",
        city: "Gdansk",
        street: "Warszawska 28",
        postalCode: "00-123",
    }),
    User.build({
        name: "Pawel",
        surname: "Michalski",
        email: "pawmichal@gmail.com",
        passwordHash: "$argon2i$v=19$m=16,t=2,p=1$YVNERmFzZmc$v7rRXcRmy/RxEmOGecl3gA", //tojesthaslo
        phoneNumber: "123456789",
        birthday:  new Date("1999-01-21"),
        gender: 1,
        country: "Poland",
        city: "Bialystok",
        street: "Powstancow 28",
        postalCode: "01-111",
    }),
    User.build({
        name: "Maja",
        surname: "Grzywach",
        email: "majkagrzywa@gmail.com",
        passwordHash: "$argon2i$v=19$m=16,t=2,p=1$YVNERmFzZmc$v7rRXcRmy/RxEmOGecl3gA", //tojesthaslo
        phoneNumber: "987654321",
        birthday:  new Date("1999-01-16"),
        gender: 0,
        country: "Poland",
        city: "Olsztyn",
        street: "Szczepanskiego 18",
        postalCode: "00-000",
    }),
]

export const mockProducts = [
    Product.build({
        name: "HP Victus 15",
        cpu: "Intel Core i5-12450H",
        memory: "16gb",
        graphics: "NVIDIA GeForce RTX 3050 ",
        price: 1279,
        amountAvailable: 100,
        photoPath: "HP_Victus_15.webp",
        details: `Laptop HP Victus został stworzony do rozgrywek na najwyższym poziomie. 
                  Ta elegancka maszyna może pochwalić się procesorem Intel® Core™ 12. generacji oraz nowoczesną kartą graficzną NVIDIA GeForce RTX. Konstrukcja tego laptopa robi równie duże wrażenie, co jego wydajne podzespoły, oferując ulepszony układ chłodzenia, pełną klawiaturę gamingową oraz kamerę HD z redukcją szumów. Korzystaj z nadzwyczajnej wydajności procesora Intel Core i5, tworząc, edytując i udostępniając treści w sposób szybszy i płynniejszy niż kiedykolwiek przedtem. Wyższa produktywność jest do Twojej dyspozycji podczas obsługi multimediów, gier, filmów w najwyższej rozdzielczości oraz filmów sferycznych. Bez spadków mocy i oczekiwania na reakcję komputera. Jednostka 12. generacji potrafi ponadto inteligentnie przyspieszyć taktowanie zegarów technologią Intel Turbo Boost, zwiększając moc adekwatnie do potrzeb.Wejdź do gry i poczuj smak zwycięstwa dzięki najnowszej platformie RTX z architekturą NVIDIA Ampere. Wyposażono ją w dedykowane rdzenie RT odpowiadające za Ray Tracing oraz rdzenie Tensor na potrzeby przetwarzania SI. Wykorzystując technologię głębokiego, maszynowego uczenia się – DLSS (Deep Learning Super Sampling), procesor graficzny zwiększy częstotliwość generowania klatek przy zachowaniu pięknych, ostrych obrazów w grach.
                  NVIDIA Reflex to najbardziej rewolucyjny zestaw technik GPU, który mierzy i obniża opóźnienie systemowe w grach turniejowych (zwane opóźnieniem „od kliknięcia do wyświetlenia”). Wkrocz do akcji i celuj oraz strzelaj już zawsze z większą precyzją. Bądź stale na pierwszym miejscu. Wydajniejsza karta graficzna to zapewnienie wyższej częstotliwości generowania klatek. Zwiększ swoją szansę na wygraną i zobacz akcję na ekranie szybciej od Twoich przeciwników.`

    }),
    Product.build({
        name: "ASUS ZenBook 14",
        cpu: "AMD Ryzen™ 5 5600H",
        memory: "16gb",
        graphics: "AMD Radeon™ Graphics",
        price: 1279,
        amountAvailable: 100,
        photoPath: "ASUS_ZenBook_14.webp",
        details: `Add a touch of brilliance to your life with Zenbook 14 Flip OLED, the slim, light and ultra-versatile convertible laptop with a gorgeous 16:10 4K OLED HDR NanoEdge touchscreen that gives you the deepest blacks and the most vivid colors. Powered by the latest AMD Ryzen™ 9 5900HX processor, Zenbook 14 Flip OLED delivers extreme performance for any task. The precision-engineered 360° ErgoLift hinge lets you work or play in whatever mode you wish — laptop, stand, tent, tablet, or anything in between — and for natural creative input the touchscreen supports a 4096-pressure-level stylus. With Zenbook 14 Flip OLED your productivity can really shine, anywhere.`
    }),
    Product.build({
        name: "Dell Inspiron G15",
        cpu: "Intel Core i5-11260H",
        memory: "16gb",
        graphics: "NVIDIA GeForce RTX 3050",
        price: 1500,
        amountAvailable: 100,
        photoPath: "Dell_Inspiron_G15.webp",
        details: `Max performance

        Alienware-inspired thermal design features optimal cooling thanks to dual air-intake, ultra-thin fan blades, copper pipes and four strategically-placed vents. As a result, you can expect your system to stay cool when the action heats up. And with up to 12th Gen Intel i7 14-core processors plus optimized performance profiles, you can revel in powerful and consistent high-end performance during every gaming experience.
        
        Vivid visuals
        
        Get fully immersed in every experience thanks to the smooth rendering from discrete graphics up to NVIDIA GeForce RTX 3060 and vivid colors of the FHD display panel up to 165Hz with 300-nits. Plus, with up to 8GB GDDR6 of dedicated memory, you can experience thrilling action with faster loading times and a quieter system.
        
        Stylish color options
        
        The highly mobile, gaming-inspired design features a new robust finish that's easy to care for and available in three colors to suit your style: Dark Shadow Grey, Phantom Grey with speckles, or Specter Green with Camouflage (coming soon).`
    }),
    Product.build({
        name: "Dell Inspiron 3525 ",
        cpu: "AMD Ryzen™ 5 5625U",
        memory: "16gb",
        graphics: "AMD Radeon™ Graphics",
        price: 689,
        amountAvailable: 100,
        photoPath: "Dell_Inspiron_3525.webp",
        details: `Daily to-do’s, done
        The speed you need: Features Intel Athlon Silver 3050U processor with 256GB HDD storage for more responsive and quieter performance. Just your type: Get an expansive keyboard with a numeric keypad, 6.4% larger keycaps, and a spacious touchpad that makes it easier to navigate your content. All day any day: Work in comfort thanks to a lift hinge that raises your device to an ergonomic angle, which provides a more comfortable typing angle. Easy on the eyes: Dell ComfortView Low Blue Light (LBL) solutions help reduce harmful blue light emissions and optimize eye comfort over extended viewing. More to see: Get more screen in a 15.6" laptop with three-side narrow borders for an immersive FHD viewing experience. A modern, thoughtful design
        Connect with confidence: A built-in HD webcam that makes you look great. Everyday considerations: Designed to last through regular use, with tiny rubber feet and bumpers on the hinge that keep it from skidding and provide additional stability when on hard surfaces.
        Unite your devices with Dell Mobile connect: Stay focused on tasks by interacting with your phone directly from your Dell PC and transfer files seamlessly.`
    }),
    Product.build({
        name: "Dell Inspiron 5515",
        cpu: "AMD Ryzen™ 5 5500U",
        memory: "16gb",
        graphics: "AMD Radeon™ Graphics",
        price: 820,
        amountAvailable: 100,
        photoPath: "Dell_Inspiron_5515.webp",
        details: `Runs smooth. Looks sharp

        Power up: Featuring AMD Ryzen 5000 Series Mobile Processors with Radeon Graphics, experience lightning-fast responsiveness and hyper-efficient battery life that keeps you productive, anywhere.Keeps its cool
        A redesigned thermal system unleashes the power of your device while also preserving its thin design. Dual heat pipes move heat away from your CPU and GPU, more fan blades move more air and a drop-hinge allows air to circulate underneath your laptop.
        
        Peace and quiet: With a fluid dynamic bearing system, your laptop's fan is not only long-lasting, but it also runs quietly while keeping your device performing at its best.`
    }),
    Product.build({
        name: "Gigabyte A5",
        cpu: "AMD Ryzen™ 5 5600H",
        memory: "16gb",
        graphics: "NVIDIA GeForce RTX 3060",
        price: 1199,
        amountAvailable: 100,
        photoPath: "Gigabyte_A5.webp",
        details: `Beyond Gaming!
        “Setting the new standard for all-around entertainment by providing a beautiful balance of gaming, entertainment, and work capabilities. Welcome to your new go-to.”
        The A5 gaming laptop combines gaming, entertainment, work and more! It's powerful AMD Ryzen™ 5000 Series processer, allows you to effortlessly handle multiple tasks at the same time.
        
        Moreover, it features up to a 240Hz screen, 3 screen display output and next-gen Wi-Fi 6 technology; with a tool for every task, this laptop can be by your side as you weave through different roles, supporting more than fight and also your everyday life.`
    }),
    Product.build({
        name: "Apple MacBook Air",
        cpu: "Apple M1",
        memory: "16gb",
        graphics: "Apple M1",
        price: 999,
        amountAvailable: 100,
        photoPath: "Apple_AIr_M1.webp",
        details: `Apple’s thinnest and lightest notebook gets supercharged with the Apple M1 chip. Tackle your projects with the blazing-fast 8-core CPU. Take graphics-intensive apps and games to the next level with a 7-core GPU. And accelerate machine learning tasks with the 16-core Neural Engine. All with up to 18 hours of battery life. Still perfectly portable. Just a lot more powerful.`
    }),
    Product.build({
        name: "Microsoft Surface Go 3Y",
        cpu: "Intel Pentium Gold 6500Y",
        memory: "4gb",
        graphics: "Intel UHD Graphics 615",
        price: 399,
        amountAvailable: 100,
        photoPath: "Microsoft_Surface_Go_3Y.webp",
        details: `Meet Surface Go 3
        See the most portable Surface touchscreen 2-in-1 in action, and discover the perfect way to tackle everyday tasks, run your favourite apps, jot down ideas, and enjoy a little down time. Built for everyone, ready anywhere
        Browse, work, play, learn and binge watch anywhere on a high-res 10.5” PixelSense™ touchscreen with adjustable Kickstand. Our most portable Surface PC is optimised for note-taking, sketching and touch with Windows 11, and is an outstanding 2-in-1 value that can replace both your tablet and laptop. Available with optional LTE Advanced1 for hassle-free connectivity.`
    }),
]
