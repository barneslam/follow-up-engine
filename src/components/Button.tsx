import { forwardRef, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition inline-flex items-center justify-center'

    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary/90',
      outline: 'border border-border text-foreground hover:bg-surface',
      secondary: 'bg-surface text-foreground hover:bg-border',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
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
