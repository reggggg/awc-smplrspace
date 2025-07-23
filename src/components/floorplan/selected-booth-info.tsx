import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";
import { useBooth } from "@/contexts/BoothContext";
import { useTicket } from "@/contexts/TicketContext";
import { toDollar } from "@/lib/helpers";

type Props = {
  selectedBooth: string | null
}

export default function SelectedBoothInfo({ selectedBooth }: Props) {
  const { boothTypes, booths } = useBooth();
  const { tickets } = useTicket();

  const booth = booths.find(b => b.name === selectedBooth);
  const boothType = boothTypes.find(bt => bt.id === booth?.booth_type);
  const ticket = tickets.find(t => t.id === boothType?.ticket);
  return (
    <AnimatePresence mode="wait">
      {!!selectedBooth && (
        <motion.div 
          key={selectedBooth}
          className="
            absolute bottom-0 left-1/2 -translate-1/2
            bg-background p-3 rounded-full min-w-full sm:min-w-[520px] drop-shadow-xl/25
            flex items-center gap-4 will-change-[transform,opacity]
          "
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col leading-5 pl-3 flex-1">
            <b>{selectedBooth}</b>
            {boothType && <span>{boothType.name}</span>}
          </div>
          {ticket?.price && <b className="text-green-600">{toDollar(ticket.price, { wholeNumber: true })}</b>}
          <Button className="rounded-full">Proceed</Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
