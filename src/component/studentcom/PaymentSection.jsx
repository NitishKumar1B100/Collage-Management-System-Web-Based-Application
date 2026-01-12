import { memo, useMemo, useCallback, useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import TuitionFeeSection from "./TuitionFeeSection ";
import AdmissionReceipt from "./AdmissionReceipt";
import ExtraPayments from "./ExtraPayments";

const PaymentSection = memo(function PaymentSection() {


  return (
    <div className="flex flex-col h-[calc(100vh-48px)] gap-6 overflow-y-auto">
          <TuitionFeeSection />
<AdmissionReceipt />
<ExtraPayments />
    </div>

  )
});

export default PaymentSection;
