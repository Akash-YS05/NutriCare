"use client"

import Image from "next/image"
import Link from "next/link"
import { Utensils, ClipboardList, TruckIcon as TruckDelivery, Users, ArrowRight, FileText, ChefHat } from 'lucide-react'
import { Button } from "@/components/ui/Button"
import { poppins } from './fonts'
import { useEffect, useState } from "react"
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${poppins.className} font-sans scroll-smooth `}>
      <header className="bg-white shadow-sm sticky top-0 z-10 font-[Manjari]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Utensils className="w-8 h-8 text-emerald-500 transition-transform group-hover:rotate-12" />
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-500 text-transparent bg-clip-text">
              NutriCare
            </span>
          </Link>
          <nav className="hidden md:flex text-gray-800 items-center space-x-8">
            <Link href="/" className="text-md font-semibold hover:text-emerald-500 transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-md font-semibold hover:text-emerald-500 transition-colors">
              Features
            </Link>
            <Link href="#testimonial" className="text-md font-semibold hover:text-emerald-500 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-md font-semibold hover:text-emerald-500 transition-colors">
              Contact
            </Link>
          </nav>
          {isLoggedIn ? (
            <Button
              className="bg-red-500 hover:bg-red-600 transition-colors text-md items-center"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-md items-center">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="md:h-screen h-4/5 bg-gradient-to-br from-sky-500 to-emerald-500 text-white">
        <div className="container flex justify-center items-center mx-auto px-4 py-20 md:py-20">
          <div className=" items-center ">
            <div className="space-y-2 leading-snug">
              <h1 className="font-[Manjari] text-5xl md:text-8xl text-center">Right <span className="inline text-teal-300 font-extrabold">Meal.</span></h1>
              <h1 className="font-[Manjari] text-5xl md:text-8xl text-center ">Right <span className="inline text-teal-300 font-extrabold">Patient.</span></h1>
              <h1 className="font-[Manjari] text-5xl md:text-8xl text-center ">Right <span className="inline text-teal-300 font-extrabold">Time.</span></h1>
              
              <p className="text-lg md:text-2xl font-[Inter] font-extralight p-3 max-w-2xl text-center">
                Efficiently manage patient diets, assign kitchen tasks, and track food delivery with our comprehensive system.
              </p>
              
              <div className="flex justify-center space-x-4">
                <Button size="lg" variant="secondary" className="text-sky-800 bg-white hover:bg-sky-50 p-6 text-lg transition-colors">
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white font-[Manjari]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-gray-700 font-bold text-center mb-12">Our Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ClipboardList, title: "Patient Diet Management", description: "Easily manage and update patient details and their specific dietary requirements." },
              { icon: Utensils, title: "Kitchen Task Assignment", description: "Efficiently assign and track tasks for the hospital's inner pantry staff." },
              { icon: TruckDelivery, title: "Food Delivery Tracking", description: "Monitor and ensure timely food delivery to patient rooms by delivery personnel." }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="w-16 h-16 text-emerald-500 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-gray-700">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20 bg-gray-100 font-[Manjari]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-gray-700 font-bold text-center mb-12">Our Streamlined Workflow</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: "Order Placement", description: "Hospital staff provides detailed food order information for each patient." },
              { icon: ChefHat, title: "Pantry Preparation", description: "Our pantry receives the orders and prepares meals according to specifications." },
              { icon: TruckDelivery, title: "Timely Delivery", description: "Dedicated delivery personnel ensure meals reach patients promptly and safely." }
            ].map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative">
                <step.icon className="w-16 h-16 text-emerald-500 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-gray-700">{step.title}</h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
                {index < 2 && (
                  <ArrowRight className="absolute top-1/2 -right-8 w-8 h-8 text-emerald-500 transform -translate-y-1/2 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 font-[Manjari]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
                Revolutionizing Hospital Food Service
              </h2>
              <p className="text-xl text-gray-600">
                Our system streamlines the entire process of hospital food management, from patient diet planning to food delivery, ensuring efficiency and patient satisfaction.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-emerald-500" />
                  <span className="font-medium text-gray-700">Multi-user Platform</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ClipboardList className="w-8 h-8 text-emerald-500" />
                  <span className="font-medium text-gray-700">Customizable Diet Charts</span>
                </div>
              </div>
              <Button className="bg-emerald-500 hover:bg-emerald-600 transition-colors">
                Learn More
              </Button>
            </div>
            <div className="relative h-[500px] transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://cdn.dribbble.com/userupload/16156002/file/original-bc57d5af2b5ad1bba18238f1a80ed5c0.jpg?resize=1504x1128&vertical=center"
                alt="Hospital Food Management Dashboard"
                fill
                className="object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-gray-800 text-white py-12 font-[Manjari]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About NutriCare</h3>
              <p className="text-gray-400">Revolutionizing hospital food management for better patient care and operational efficiency.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">123 Hospital Street<br />Cityville, India 12345<br />contact@nutricare.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
              <a href="https://github.com/Akash-YS05" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 
                    0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.907-.62.069-.607.069-.607 
                    1.003.07 1.53 1.031 1.53 1.031.892 1.53 2.341 1.089 2.91.833.092-.646.35-1.09.637-1.342-2.22-.253-4.555-1.11-4.555-4.943 
                    0-1.091.39-1.983 1.029-2.681-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.563 9.563 0 0 1 12 6.837c.85.004 
                    1.705.115 2.504.337 1.91-1.294 2.75-1.025 2.75-1.025.544 1.377.201 2.394.098 2.647.64.698 1.029 1.59 1.029 2.681 0 
                    3.842-2.337 4.687-4.564 4.935.36.31.678.921.678 1.855 0 1.34-.012 2.421-.012 2.75 0 .267.18.577.688.48A10.001 10.001 
                    0 0 0 22 12c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg></a>
                <a href="https:/x.com/AkashPandeyTwT" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; 2025 NutriCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

