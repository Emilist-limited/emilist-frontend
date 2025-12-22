export const hasInvoice = (milestones?: any): boolean => {
  return (
    milestones?.some((milestone: any) => milestone.invoice?.invoiceRaised) ||
    false
  );
};
