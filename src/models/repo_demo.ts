/**
 * defined types
 */
interface Person{
    ID: number;
    Name: string;
    Surname: string;
    Email: string;
    Password_Hash: string;
    Phone_number: string;
    Birthday: Date;
    Gender: number;
    Country: string;
    City: string;
    Street: string;
    Postal_Code: string;
    OrderIDs: number[];
    basket: number[];
}

interface Product{
    ID: number;
    Name: string;
    CPU: string;
    Memory: string;
    Graphics: string;
    Price: number;
    Number_available: number; 
    Photo_Path: string;
    Details: string;
}

interface Order{
    ID: number;
    UserID: number;
    ProductIDs: number[];
    OrderPlacementDate: Date;
    Status: number;
}



interface Settings{
    number_of_users: number;
    number_of_products: number;
    number_of_orders: number;
    admin_login: string;
    admin_psw: string;
}

/**
 * Fake database
 */
let users: Person[]=[
    {
        ID: 1,
        Name: "Jan",
        Surname: "Kowalski",
        Email: "jankowal@gmail.com",
        Password_Hash: "$argon2i$v=19$m=16,t=2,p=1$YVNERmFzZmc$v7rRXcRmy/RxEmOGecl3gA", //tojesthaslo
        Phone_number: "123456789",
        Birthday:  new Date("1999-01-16"),
        Gender: 1,
        Country: "Poland",
        City: "Gdansk",
        Street: "Warszawska 28",
        Postal_Code: "00-123",
        OrderIDs: [],
        basket: []
    },
    {
        ID: 2,
        Name: "Pawel",
        Surname: "Michalski",
        Email: "pawmichal@gmail.com",
        Password_Hash: "$argon2i$v=19$m=16,t=2,p=1$YVNERmFzZmc$v7rRXcRmy/RxEmOGecl3gA", //tojesthaslo
        Phone_number: "123456789",
        Birthday:  new Date("1990-01-21"),
        Gender: 1,
        Country: "Poland",
        City: "Bialystok",
        Street: "Powstancow 28",
        Postal_Code: "01-111",
        OrderIDs: [],
        basket: []
    },
    {
        ID: 3,
        Name: "Maja",
        Surname: "Grzywach",
        Email: "majkagrzywa@gmail.com",
        Password_Hash: "$argon2i$v=19$m=16,t=2,p=1$YVNERmFzZmc$v7rRXcRmy/RxEmOGecl3gA", //tojesthaslo
        Phone_number: "987654321",
        Birthday:  new Date("1999-01-16"),
        Gender: 0,
        Country: "Poland",
        City: "Olsztyn",
        Street: "Szczepanskiego 18",
        Postal_Code: "00-000",
        OrderIDs: [],
        basket: []
    },  
]

let products: Product[]=[
    {
        ID: 1,
        Name: "HP Victus 15",
        CPU: "Intel Core i5-12450H",
        Memory: "16gb",
        Graphics: "NVIDIA GeForce RTX 3050 ",
        Price: 1279,
        Number_available: 100,
        Photo_Path: "/",
        Details: `Laptop HP Victus został stworzony do rozgrywek na najwyższym poziomie. 
                  Ta elegancka maszyna może pochwalić się procesorem Intel® Core™ 12. generacji oraz nowoczesną kartą graficzną NVIDIA GeForce RTX. Konstrukcja tego laptopa robi równie duże wrażenie, co jego wydajne podzespoły, oferując ulepszony układ chłodzenia, pełną klawiaturę gamingową oraz kamerę HD z redukcją szumów. Korzystaj z nadzwyczajnej wydajności procesora Intel Core i5, tworząc, edytując i udostępniając treści w sposób szybszy i płynniejszy niż kiedykolwiek przedtem. Wyższa produktywność jest do Twojej dyspozycji podczas obsługi multimediów, gier, filmów w najwyższej rozdzielczości oraz filmów sferycznych. Bez spadków mocy i oczekiwania na reakcję komputera. Jednostka 12. generacji potrafi ponadto inteligentnie przyspieszyć taktowanie zegarów technologią Intel Turbo Boost, zwiększając moc adekwatnie do potrzeb.Wejdź do gry i poczuj smak zwycięstwa dzięki najnowszej platformie RTX z architekturą NVIDIA Ampere. Wyposażono ją w dedykowane rdzenie RT odpowiadające za Ray Tracing oraz rdzenie Tensor na potrzeby przetwarzania SI. Wykorzystując technologię głębokiego, maszynowego uczenia się – DLSS (Deep Learning Super Sampling), procesor graficzny zwiększy częstotliwość generowania klatek przy zachowaniu pięknych, ostrych obrazów w grach.
                  NVIDIA Reflex to najbardziej rewolucyjny zestaw technik GPU, który mierzy i obniża opóźnienie systemowe w grach turniejowych (zwane opóźnieniem „od kliknięcia do wyświetlenia”). Wkrocz do akcji i celuj oraz strzelaj już zawsze z większą precyzją. Bądź stale na pierwszym miejscu. Wydajniejsza karta graficzna to zapewnienie wyższej częstotliwości generowania klatek. Zwiększ swoją szansę na wygraną i zobacz akcję na ekranie szybciej od Twoich przeciwników.`
        
    },
    {
        ID: 2,
        Name: "ASUS ZenBook 14",
        CPU: "AMD Ryzen™ 5 5600H",
        Memory: "16gb",
        Graphics: "AMD Radeon™ Graphics",
        Price: 1279,
        Number_available: 100,
        Photo_Path: "/",
        Details: `Add a touch of brilliance to your life with Zenbook 14 Flip OLED, the slim, light and ultra-versatile convertible laptop with a gorgeous 16:10 4K OLED HDR NanoEdge touchscreen that gives you the deepest blacks and the most vivid colors. Powered by the latest AMD Ryzen™ 9 5900HX processor, Zenbook 14 Flip OLED delivers extreme performance for any task. The precision-engineered 360° ErgoLift hinge lets you work or play in whatever mode you wish — laptop, stand, tent, tablet, or anything in between — and for natural creative input the touchscreen supports a 4096-pressure-level stylus. With Zenbook 14 Flip OLED your productivity can really shine, anywhere.` 
    },
    {
        ID: 3,
        Name: "Dell Inspiron G15",
        CPU: "Intel Core i5-11260H",
        Memory: "16gb",
        Graphics: "NVIDIA GeForce RTX 3050",
        Price: 1500,
        Number_available: 100,
        Photo_Path: "/",
        Details: `Max performance

        Alienware-inspired thermal design features optimal cooling thanks to dual air-intake, ultra-thin fan blades, copper pipes and four strategically-placed vents. As a result, you can expect your system to stay cool when the action heats up. And with up to 12th Gen Intel i7 14-core processors plus optimized performance profiles, you can revel in powerful and consistent high-end performance during every gaming experience.
        
        Vivid visuals
        
        Get fully immersed in every experience thanks to the smooth rendering from discrete graphics up to NVIDIA GeForce RTX 3060 and vivid colors of the FHD display panel up to 165Hz with 300-nits. Plus, with up to 8GB GDDR6 of dedicated memory, you can experience thrilling action with faster loading times and a quieter system.
        
        Stylish color options
        
        The highly mobile, gaming-inspired design features a new robust finish that's easy to care for and available in three colors to suit your style: Dark Shadow Grey, Phantom Grey with speckles, or Specter Green with Camouflage (coming soon).`
    },
    {
        ID: 4,
        Name: "Dell Inspiron 3525 ",
        CPU: "AMD Ryzen™ 5 5625U",
        Memory: "16gb",
        Graphics: "AMD Radeon™ Graphics",
        Price: 689,
        Number_available: 100,
        Photo_Path: "/",
        Details: `Daily to-do’s, done
        The speed you need: Features Intel Athlon Silver 3050U processor with 256GB HDD storage for more responsive and quieter performance. Just your type: Get an expansive keyboard with a numeric keypad, 6.4% larger keycaps, and a spacious touchpad that makes it easier to navigate your content. All day any day: Work in comfort thanks to a lift hinge that raises your device to an ergonomic angle, which provides a more comfortable typing angle. Easy on the eyes: Dell ComfortView Low Blue Light (LBL) solutions help reduce harmful blue light emissions and optimize eye comfort over extended viewing. More to see: Get more screen in a 15.6" laptop with three-side narrow borders for an immersive FHD viewing experience. A modern, thoughtful design
        Connect with confidence: A built-in HD webcam that makes you look great. Everyday considerations: Designed to last through regular use, with tiny rubber feet and bumpers on the hinge that keep it from skidding and provide additional stability when on hard surfaces.
        Unite your devices with Dell Mobile connect: Stay focused on tasks by interacting with your phone directly from your Dell PC and transfer files seamlessly.`
    },
    {
        ID: 5,
        Name: "Dell Inspiron 5515",
        CPU: "AMD Ryzen™ 5 5500U",
        Memory: "16gb",
        Graphics: "AMD Radeon™ Graphics",
        Price: 820,
        Number_available: 100,
        Photo_Path: "/Dell_Inspiron_3525",
        Details: `Runs smooth. Looks sharp

        Power up: Featuring AMD Ryzen 5000 Series Mobile Processors with Radeon Graphics, experience lightning-fast responsiveness and hyper-efficient battery life that keeps you productive, anywhere.Keeps its cool
        A redesigned thermal system unleashes the power of your device while also preserving its thin design. Dual heat pipes move heat away from your CPU and GPU, more fan blades move more air and a drop-hinge allows air to circulate underneath your laptop.
        
        Peace and quiet: With a fluid dynamic bearing system, your laptop's fan is not only long-lasting, but it also runs quietly while keeping your device performing at its best.`
    },
    {
        ID: 6,
        Name: "Gigabyte A5",
        CPU: "AMD Ryzen™ 5 5600H",
        Memory: "16gb",
        Graphics: "NVIDIA GeForce RTX 3060",
        Price: 1199,
        Number_available: 100,
        Photo_Path: "/",
        Details: `Beyond Gaming!
        “Setting the new standard for all-around entertainment by providing a beautiful balance of gaming, entertainment, and work capabilities. Welcome to your new go-to.”
        The A5 gaming laptop combines gaming, entertainment, work and more! It's powerful AMD Ryzen™ 5000 Series processer, allows you to effortlessly handle multiple tasks at the same time.
        
        Moreover, it features up to a 240Hz screen, 3 screen display output and next-gen Wi-Fi 6 technology; with a tool for every task, this laptop can be by your side as you weave through different roles, supporting more than fight and also your everyday life.`
    },
    {
        ID: 7,
        Name: "Apple MacBook Air",
        CPU: "Apple M1",
        Memory: "16gb",
        Graphics: "Apple M1",
        Price: 999,
        Number_available: 100,
        Photo_Path: "/",
        Details: `Apple’s thinnest and lightest notebook gets supercharged with the Apple M1 chip. Tackle your projects with the blazing-fast 8-core CPU. Take graphics-intensive apps and games to the next level with a 7-core GPU. And accelerate machine learning tasks with the 16-core Neural Engine. All with up to 18 hours of battery life. Still perfectly portable. Just a lot more powerful.`
    },
    {
        ID: 8,
        Name: "Microsoft Surface Go 3Y",
        CPU: "Intel Pentium Gold 6500Y",
        Memory: "4gb",
        Graphics: "Intel UHD Graphics 615",
        Price: 399,
        Number_available: 100,
        Photo_Path: "/",
        Details: `Meet Surface Go 3
        See the most portable Surface touchscreen 2-in-1 in action, and discover the perfect way to tackle everyday tasks, run your favourite apps, jot down ideas, and enjoy a little down time. Built for everyone, ready anywhere
        Browse, work, play, learn and binge watch anywhere on a high-res 10.5” PixelSense™ touchscreen with adjustable Kickstand. Our most portable Surface PC is optimised for note-taking, sketching and touch with Windows 11, and is an outstanding 2-in-1 value that can replace both your tablet and laptop. Available with optional LTE Advanced1 for hassle-free connectivity.`
    },
]

let orders:Order[]=[
    {
        ID: 1,
        UserID: 1,
        ProductIDs: [1, 2, 4],
        OrderPlacementDate: new Date("2022-01-16"),
        Status: 0,
    },
    {
        ID: 2,
        UserID: 2,
        ProductIDs: [3, 5, 6],
        OrderPlacementDate: new Date("2022-12-16"),
        Status: 1,
    },
    {
        ID: 3,
        UserID: 3,
        ProductIDs: [7,8],
        OrderPlacementDate: new Date("2023-01-12"),
        Status: 0,
    },
    {
        ID: 4,
        UserID: 1,
        ProductIDs: [1, 2, 4, 8],
        OrderPlacementDate: new Date("2023-01-16"),
        Status: 0,
    },
]



let settings:Settings ={
    number_of_users: 3,
    number_of_products: 8,
    number_of_orders: 4,
    admin_login: "admin",
    admin_psw: "$argon2i$v=19$m=16,t=2,p=1$YXdkdGZneGM$mjr3iMKplxjkI6867RVLmg",
}
export function get_admin()
{
    return {
        login: settings.admin_login,
        password: settings.admin_psw
    }
}
/**
 * Function shows all settings
 */
export function showSettings(){
    return settings;
}

/**
 * Function shows all users
 */
export function getAllUsers():Person[]{
    return users;
}

/**
 * Function shows one user by ID
 */
export function getUserbyId(id:number):Person|null{
    const res =  users.find(u => u.ID === id);
    if(res !== undefined)
    {
        return res;
    }
    else
    {
        return null;
    }
}
/**
 * Function finds user by email
 */
export function getUserbyEmail(mail:string):Person|null{
    const res =  users.find(u => u.Email === mail);
    if(res !== undefined)
    {
        return res;
    }
    else
    {
        return null;
    }
}

export const mailexist = function (mail) {
    return new Promise(function (resolve, reject) {
  
        const res =  users.find(u => u.Email === mail);
        let odp;
        if(res !== undefined)
        {
            odp = true
        }
        else
        {
            odp = false
        }   
        resolve(odp);
      
    });
  };


/**
 * Function adds new user to db
 */
export function pushNewUser(u:Person){
    users.push(u)
    settings.number_of_users += 1;
}

/**
 * Function edits user data
 */
export function editUser(new_user:Person){
    let index = users.findIndex(u => u.ID === new_user.ID)
    if(index !== -1)
    {
        users[index]=new_user;
    }
}



/**
 * Function returns all orders from db
 */
export function getAllOrders():Order[]{
    return orders;
}

/**
 * Function returns all orders from db
 */
export function getOrderByID(id:number):Order|null{
    const res =  orders.find(o => o.ID === id);
    if(res !== undefined)
    {
        return res;
    }
    else
    {
        return null;
    }
}

/**
 * Function returns user data
 */
export function getOrdersbyUserID(id: number):Order[]{
    return orders.filter(o => o.UserID === id)
}

/**
 * Function adds order to db
 */
export function pushNewOrder(o: Order){
    orders.push(o);
    settings.number_of_orders += 1
}

/**
 * Function returns all products from db
 */
export function getAllProducts(): Product[]
{
    return products;
}

/**
 * Function returns one product(by id) from db
 */
export function getProductbyID(id:number):Product|null{
    const res =  products.find(u => u.ID === id);
    if(res !== undefined)
    {
        return res;
    }
    else
    {
        return null;
    }
}

/**
 * Function adds one new product to db.
 */
export function pushNewProduct(prod: Product){
    products.push(prod);
    settings.number_of_products+=1;
}

/**
 * Function adds one new product to db.
 */
export function editProduct(prod: Product){
    let index = products.findIndex(p => p.ID === prod.ID)
    if(index !== -1)
    {
        products[index]=prod;
    }
}