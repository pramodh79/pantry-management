import { BuildingStorefrontIcon, ClockIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pantry Pro</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">About</a>
          <a href="/signup" className="hover:underline">Sign Up</a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="bg-primary text-primary-foreground text-center p-16 h-[60vh] flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Manage Your Pantry with Ease</h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Pantry Pro is the ultimate tool for keeping your kitchen organized and your food fresh.
            Track your inventory and get expiration alerts.
          </p>
          <div className="space-x-4">
            <Link href="/getstarted">
            <button className="bg-primary-foreground text-primary px-4 py-2 rounded">Get Started</button>
            </Link>
          </div>
        </section>

        <section className="p-16 bg-secondary text-secondary-foreground h-[60vh] flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="flex justify-around gap-8">
            <div className="text-center p-8 bg-card rounded-lg">
              <BuildingStorefrontIcon className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Inventory Tracking</h3>
              <p>Keep track of what in your pantry and fridge with our easy-to-use inventory management system.</p>
            </div>
            <div className="text-center p-8 bg-card rounded-lg">
              <ClockIcon className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expiration Alerts</h3>
              <p>Never let food go to waste again with our smart expiration alerts that notify you when items are about to expire.</p>
            </div>
            <div className="text-center p-8 bg-card rounded-lg">
              <LightBulbIcon className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Recipe Suggestions</h3>
              <p>Get personalized recipe suggestions based on the ingredients you have in your pantry.</p>
            </div>
          </div>
        </section>

        <section className="p-16 bg-background text-foreground h-[60vh] flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-4">About Pantry Pro</h2>
          <p className="text-center max-w-xl mx-auto">
            Pantry Pro was created to help busy families and individuals streamline their food management and reduce food waste.
            Our mission is to make it easier than ever to keep your kitchen organized and your meals planned.
          </p>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground text-center p-4">
        <p>© 2023 Pantry Pro. All rights reserved.</p>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </nav>
      </footer>
    </div>
  );
}
