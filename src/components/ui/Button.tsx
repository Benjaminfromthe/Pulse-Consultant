'use client';

import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, MouseEventHandler } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: undefined;
  download?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-teal text-white border border-transparent hover:bg-teal-hover focus:ring-2 focus:ring-teal focus:ring-offset-2',
  secondary:
    'bg-navy text-white border border-transparent hover:bg-navy-hover focus:ring-2 focus:ring-navy focus:ring-offset-2',
  outline:
    'bg-transparent text-navy border border-gold hover:border-gold hover:text-teal hover:bg-white focus:ring-2 focus:ring-gold focus:ring-offset-2',
  ghost:
    'bg-transparent text-navy border border-transparent hover:bg-navy/5 focus:ring-2 focus:ring-navy/20 focus:ring-offset-2',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm font-medium min-h-[36px]',
  md: 'px-6 py-3 text-sm font-semibold min-h-[44px] md:min-h-[44px] min-h-[48px]',
  lg: 'px-8 py-4 text-base font-semibold min-h-[52px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded transition-all duration-150 ease-in-out cursor-pointer select-none font-jakarta';
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ('href' in props && props.href !== undefined) {
    const { href, download, target, rel, onClick, ...rest } = props as ButtonAsLink;
    if (download) {
      return (
        <a href={href} download={download} target={target} rel={rel} onClick={onClick} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
