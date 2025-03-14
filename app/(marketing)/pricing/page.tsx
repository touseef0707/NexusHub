import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing | NexusHub',
  description: 'Explore NexusHub pricing plans. Find the perfect plan for your YouTube collaboration needs, from solo creators to large teams.',
};

// Define types for our pricing plans
type PricingPlan = {
  id: string;
  name: string;
  price: {
    monthly: string;
    annual: string;
  };
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText?: string;
  buttonVariant?: "default" | "outline";
};

// Define types for our feature comparison
type FeatureComparison = {
  name: string;
  starter: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
};

// Define our pricing plans
const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: {
      monthly: '$19',
      annual: '$15',
    },
    description: 'Perfect for solo creators just getting started.',
    features: [
      "Up to 3 projects",
      "Basic collaboration tools",
      "1 team member",
      "5GB storage",
      "Email support",
      "Basic analytics"
    ],
    buttonVariant: "outline"
  },
  {
    id: 'pro',
    name: 'Pro',
    price: {
      monthly: '$49',
      annual: '$39',
    },
    description: 'For growing creators with a small team.',
    features: [
      "Unlimited projects",
      "Advanced collaboration tools",
      "Up to 5 team members",
      "25GB storage",
      "Priority email support",
      "Advanced analytics",
      "Custom branding"
    ],
    highlighted: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 'Custom',
      annual: 'Custom',
    },
    description: 'For established creators and larger teams.',
    features: [
      "Unlimited everything",
      "Premium collaboration tools",
      "Unlimited team members",
      "100GB+ storage",
      "24/7 dedicated support",
      "Custom analytics dashboard",
      "Custom branding",
      "API access",
      "SSO authentication"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline"
  }
];

// Define our feature comparison data
const featureComparisons: FeatureComparison[] = [
  { name: 'Projects', starter: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Team Members', starter: '1', pro: '5', enterprise: 'Unlimited' },
  { name: 'Storage', starter: '5GB', pro: '25GB', enterprise: '100GB+' },
  { name: 'Video Collaboration', starter: 'Basic', pro: 'Advanced', enterprise: 'Premium' },
  { name: 'Feedback Tools', starter: true, pro: true, enterprise: true },
  { name: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
  { name: 'Custom Branding', starter: false, pro: true, enterprise: true },
  { name: 'API Access', starter: false, pro: false, enterprise: true },
  { name: 'Support', starter: 'Email', pro: 'Priority Email', enterprise: '24/7 Dedicated' }
];

// Define our FAQ data
const faqItems = [
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you\'ll be charged the prorated amount for the remainder of your billing cycle. When you downgrade, the new rate will apply at the start of your next billing cycle.'
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes, you can save 20% by choosing annual billing for any of our plans. Simply toggle to "Annual" in the pricing section to see the discounted rates.'
  },
  {
    question: 'What happens when I reach my storage limit?',
    answer: 'When you approach your storage limit, we\'ll notify you so you can either upgrade your plan or manage your existing storage. You won\'t lose any data if you exceed your limit, but you won\'t be able to upload new files until you free up space or upgrade.'
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes, all plans come with a 14-day free trial. No credit card is required to start your trial. You can explore all the features of your chosen plan before committing.'
  }
];

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  highlighted = false,
  buttonText = "Get Started",
  buttonVariant = "default"
}: { 
  name: string; 
  price: string; 
  description: string; 
  features: string[];
  highlighted?: boolean;
  buttonText?: string;
  buttonVariant?: "default" | "outline";
}) => {
  return (
    <div className={`rounded-xl border ${highlighted ? 'border-primary shadow-lg scale-105' : 'border-border'} bg-card p-8 relative`}>
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <div className="bg-primary text-primary-foreground text-sm font-medium py-1 px-4 rounded-full">
            Most Popular
          </div>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-muted-foreground ml-2">/month</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        asChild 
        className="w-full" 
        variant={buttonVariant}
        size="lg"
      >
        <Link href="/dashboard">{buttonText}</Link>
      </Button>
    </div>
  );
};

export default function PricingPage() {
  // In a client component, you would use useState here
  // Since this is a server component, we'll just define a variable
  const billingPeriod = 'monthly'; // or 'annual'

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the plan that's right for you and your team. All plans include a 14-day free trial.
        </p>
      </div>

      {/* Pricing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-card border border-border rounded-lg p-1 inline-flex">
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium">
            Monthly
          </button>
          <button className="px-4 py-2 rounded-md text-foreground font-medium">
            Annual
          </button>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {pricingPlans.map((plan) => (
          <PricingTier
            key={plan.id}
            name={plan.name}
            price={plan.price[billingPeriod as keyof typeof plan.price]}
            description={plan.description}
            features={plan.features}
            highlighted={plan.highlighted}
            buttonText={plan.buttonText}
            buttonVariant={plan.buttonVariant}
          />
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Compare Plans</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 px-6 text-left font-medium">Features</th>
                <th className="py-4 px-6 text-center font-medium">Starter</th>
                <th className="py-4 px-6 text-center font-medium">Pro</th>
                <th className="py-4 px-6 text-center font-medium">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {featureComparisons.map((feature, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="py-4 px-6 font-medium">{feature.name}</td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : (
                        '—'
                      )
                    ) : (
                      feature.starter
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : (
                        '—'
                      )
                    ) : (
                      feature.pro
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : (
                        '—'
                      )
                    ) : (
                      feature.enterprise
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {faqItems.map((faq, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-card p-10 rounded-xl shadow-lg border border-border">
        <h2 className="text-3xl font-bold mb-6">Ready to transform your creative workflow?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of creators and editors who are already using NexusHub to collaborate more effectively.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">Start Your Free Trial</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 