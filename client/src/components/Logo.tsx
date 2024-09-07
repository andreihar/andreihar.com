import { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 55 65">
    <g>
      <path d="M 25,0 L 0,15 L 0,50 L 5,53 L 5,35 L 20,35 L 20,62 L 25,65 Z M 20,8.5 L 5,17.5 L 5,30 L 20,30 Z" fill="currentColor" fillRule="evenodd" />
      <polygon points="30,0 35,3 35,30 50,30 50,12 55,15 55,50 50,53 50,35 35,35 35,62 30,65" fill="currentColor" />
    </g>
  </svg>
);

export default Logo;