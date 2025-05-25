'use client';

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { createContext, useContext, ReactNode } from "react";

type OrganizationContextType = {
  organization: ReturnType<typeof useOrganization>["organization"];
  isLoaded: boolean;
  setActive: ReturnType<typeof useOrganizationList>["setActive"];
  userMemberships: ReturnType<typeof useOrganizationList>["userMemberships"];
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { organization, isLoaded } = useOrganization();
  const { userMemberships, setActive } = useOrganizationList({
    userMemberships: true,
  });

  return (
    <OrganizationContext.Provider
      value={{
        organization,
        isLoaded,
        setActive,
        userMemberships
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganizationContext() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error("useOrganizationContext must be used within an OrganizationProvider");
  }
  return context;
} 