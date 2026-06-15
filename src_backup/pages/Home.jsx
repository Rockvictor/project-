import HeroSection from '../components/home/HeroSection';
import ProcessFlow from '../components/home/ProcessFlow';
import ProductPreview from '../components/home/ProductPreview';
import ImpactStats from '../components/home/ImpactStats';
import CommunitySection from '../components/home/CommunitySection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProcessFlow />
      <ProductPreview />
      <CommunitySection />
      <ImpactStats />
    </div>
  );
}