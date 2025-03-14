'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, CheckCircle } from 'lucide-react';

interface BillingPlan {
  id: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  features: string[];
  current: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending';
}

export function BillingTab() {
  const [plans] = useState<BillingPlan[]>([
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      interval: 'forever',
      description: 'Basic features for personal projects',
      features: [
        'Up to 3 projects',
        'Up to 2 team members',
        'Basic analytics',
        'Community support',
      ],
      current: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$15',
      interval: 'per month',
      description: 'Advanced features for professionals',
      features: [
        'Unlimited projects',
        'Up to 10 team members',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
      ],
      current: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49',
      interval: 'per month',
      description: 'Complete solution for large teams',
      features: [
        'Unlimited projects',
        'Unlimited team members',
        'Advanced analytics',
        'Dedicated support',
        'Custom branding',
        'API access',
        'SSO authentication',
      ],
      current: false,
    },
  ]);

  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-001',
      date: 'May 1, 2023',
      amount: '$15.00',
      status: 'paid',
    },
    {
      id: 'INV-002',
      date: 'April 1, 2023',
      amount: '$15.00',
      status: 'paid',
    },
    {
      id: 'INV-003',
      date: 'March 1, 2023',
      amount: '$15.00',
      status: 'paid',
    },
  ]);

  const currentPlan = plans.find((plan) => plan.current);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{currentPlan?.name} Plan</h3>
                  <Badge variant="outline" className="text-xs">Current</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentPlan?.price} {currentPlan?.interval}
                </p>
              </div>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card key={plan.id} className={plan.current ? 'border-primary' : ''}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/{plan.interval}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.current ? 'outline' : 'default'}
                    className="w-full"
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View and download your past invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{invoice.id}</h3>
                  <p className="text-sm text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{invoice.amount}</span>
                  <Badge
                    variant={invoice.status === 'paid' ? 'success' : 'outline'}
                    className={
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-800 hover:bg-green-100'
                        : ''
                    }
                  >
                    {invoice.status}
                  </Badge>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 