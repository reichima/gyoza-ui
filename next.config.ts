import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

/** @type {NextConfig} */
const config: NextConfig = {
  reactStrictMode: true,
};

const withMDX = createMDX();

export default withMDX(config);