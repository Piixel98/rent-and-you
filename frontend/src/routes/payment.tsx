import { createFileRoute, redirect } from '@tanstack/react-router'
import { isLoggedIn } from "../hooks/useAuth.ts";
import PaymentGateway from "../components/Rent/PaymentGateway.tsx";

export const Route = createFileRoute('/payment')({
  component: PaymentGateway,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: '/',
      })
    }
  }
});
