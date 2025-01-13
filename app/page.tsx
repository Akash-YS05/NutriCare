import Image from "next/image"
import Link from "next/link"
import { Utensils, ClipboardList, TruckIcon as TruckDelivery, Users, Star, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/Button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Utensils className="w-8 h-8 text-emerald-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-500 text-transparent bg-clip-text">NutriCare</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              About
            </Link>
            <Link href="/features" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Features
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-emerald-500 hover:bg-emerald-600 transition-colors">
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-600 to-emerald-500 text-white">
        <div className="container mx-auto px-4 py-20 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Streamline Hospital Food Management
              </h1>
              <p className="text-xl md:text-2xl text-sky-100">
                Efficiently manage patient diets, assign kitchen tasks, and track food delivery with our comprehensive system.
              </p>
              <Button size="lg" variant="secondary" className="text-sky-800 bg-white hover:bg-sky-50 transition-colors">
                Get Started
              </Button>
            </div>
            <div className="relative h-[400px] md:h-[600px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ebf014fcacb945d37d6976edcfc6312b.jpg-bURynvF7fiCKn9Zw8AiM6BwcOW8z6q.jpeg"
                alt="Hospital Food Management"
                fill
                className="object-contain rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ClipboardList, title: "Patient Diet Management", description: "Easily manage and update patient details and their specific dietary requirements." },
              { icon: Utensils, title: "Kitchen Task Assignment", description: "Efficiently assign and track tasks for the hospital's inner pantry staff." },
              { icon: TruckDelivery, title: "Food Delivery Tracking", description: "Monitor and ensure timely food delivery to patient rooms by delivery personnel." }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="w-16 h-16 text-emerald-500 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Revolutionizing Hospital Food Service
              </h2>
              <p className="text-xl text-gray-600">
                Our system streamlines the entire process of hospital food management, from patient diet planning to food delivery, ensuring efficiency and patient satisfaction.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-emerald-500" />
                  <span className="font-medium">Multi-user Platform</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ClipboardList className="w-8 h-8 text-emerald-500" />
                  <span className="font-medium">Customizable Diet Charts</span>
                </div>
              </div>
              <Button className="bg-emerald-500 hover:bg-emerald-600 transition-colors">
                Learn More
              </Button>
            </div>
            <div className="relative h-[500px]">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial) => (
              <div key={testimonial} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg p-8 transition-all hover:shadow-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "NutriCare has significantly improved our food service efficiency. Patient satisfaction has increased, and our staff finds it easy to use."
                </p>
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg"
                    alt="John Doe"
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-500">Hospital Administrator</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">123 Hospital Street<br />Cityville, State 12345<br />contact@nutricare.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; 2023 NutriCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

