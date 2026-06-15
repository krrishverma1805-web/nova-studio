import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Statistics from '@/components/sections/Statistics';
import ContactForm from '@/components/sections/ContactForm';

export const dynamic = 'force-dynamic';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Statistics />
      <ContactForm />
    </>
  );
};

export default HomePage;
