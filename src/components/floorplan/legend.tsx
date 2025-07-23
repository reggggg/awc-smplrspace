import { BoothStatus, BoothStatusColors } from "@/lib/constants";

export default function Legend() {

  const legendItems = [
    { 
      name: 'Selected', 
      bgColor: '#3498db60', 
      borderColor: '#3498db80' 
    },
    { 
      name: 'Available', 
      bgColor: BoothStatusColors[BoothStatus.AVAILABLE].concat('60'), 
      borderColor: BoothStatusColors[BoothStatus.AVAILABLE].concat('80') 
    },
    { 
      name: 'Sold', 
      bgColor: BoothStatusColors[BoothStatus.PURCHASED].concat('60'),
      borderColor: BoothStatusColors[BoothStatus.PURCHASED].concat('80') 
    },
    { 
      name: 'Sponsor Booth', 
      bgColor: '#9b59b660',
      borderColor: '#9b59b680' 
    },
  ];

  return (
    <div className="flex flex-col flex-wrap gap-2 drop-shadow-2xl">
      {legendItems.map((item) => (
        <div key={item.name} className="flex items-center gap-2">
          <span 
            className="w-4 h-4 rounded-full border" 
            style={{
              backgroundColor: item.bgColor,
              borderColor: item.borderColor
            }}
          />
          <span className="text-sm text-gray-700">{item.name}</span>
        </div>
      ))}
    </div>
  )
}