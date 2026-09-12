'use client';

import { HomeAbout } from '@/components/sections/home-about';
import { HomeConfia } from '@/components/sections/home-confia';
import {
  AboutStatsStrip,
  HomeEmpresa,
} from '@/components/sections/home-empresa';
import { HomeImportAsia } from '@/components/sections/home-import-asia';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <HomeAbout />
      <AboutStatsStrip />
      <HomeEmpresa />

      <div className="bg-[#f3f5f8]">
        <HomeConfia />
        <HomeImportAsia />
      </div>
    </div>
  );
}
