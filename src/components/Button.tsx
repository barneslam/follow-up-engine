import { forwardRef, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-all inline-flex items-center justify-center gap-2 shadow-sm'

    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary/95 hover:shadow-md active:shadow-sm',
      outline: 'border-2 border-slate text-slate hover:bg-slate/5 hover:shadow-md',
      secondary: 'bg-slate/10 text-slate hover:bg-slate/15 hover:shadow-md',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3.5 text-base',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
