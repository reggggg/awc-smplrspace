import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { loadSmplrJs, type Space } from "@smplrspace/smplr-loader";
import entities from './booths.json';
import type { TBooth } from '@/lib/types';
import { BoothStatus, BoothStatusColors } from '@/lib/constants';
import { toast } from 'sonner';

type Props = {
  className?: React.ComponentProps<'div'>['className'],
  mode?: '2d' | '3d',
  selectEntity?: (booth: string) => void,
  booths: TBooth[],
  selectedEntity: string | null,
}

const Viewer = ({ 
  className,
  mode = '3d',
  selectEntity,
  selectedEntity,
  booths,
}: Props) => {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<Space | null>(null);

  const extendedEntities = useMemo(() => {
    const boothMap = new Map(booths.map(b => [b.name, b]));

    return entities.flatMap(entity =>
      entity.assets.map(asset => {
        const booth = boothMap.get(asset.name);
        const status = booth?.status ?? null;
        const color =
          asset.name === selectedEntity
            ? '#3498db'
            : booth
            ? BoothStatusColors[booth.status]
            : '#ccc';

        return {
          ...asset,
          status,
          color,
        };
      })
    );
  }, [booths, selectedEntity]);

  useEffect(() => {
    const clientToken = import.meta.env.VITE_SMPLRSPACE_CLIENT_TOKEN;

    if (!clientToken) {
      console.error("Missing SMPLRSPACE token environment variable.");
      return;
    }

    loadSmplrJs()
      .then((smplr) => {
        if (!containerRef.current) return;

        const space = new smplr.Space({
          spaceId: "spc_ctghuofw",
          clientToken,
          container: containerRef.current,
        });

        spaceRef.current = space;

        space.startViewer({
          onReady: () => {
            console.log('Viewer is ready');
            setIsReady(true);
          },
          onError: (error) => console.error("Could not start viewer", error),
          allowModeChange: true,
          mode,
          renderOptions: {
            compass: false,
          },
          loadingMessage: 'Loading floorplan...'
        });
      })
      .catch((error) => console.error("Failed to load Smplr JS:", error));

    return () => {
      spaceRef.current?.removeAllDataLayers();
      spaceRef.current = null;
    }
  }, [mode]);

  useEffect(() => {
    if (!spaceRef.current || isReady === false) return;

    spaceRef.current.removeDataLayer('booths'); // clean before re-adding
    spaceRef.current.addPolygonDataLayer({
      id: 'booths',
      data: extendedEntities,
      color: (data) => data.color,
      alpha: 0.7,
      height: 2.9,
      onClick: (booth) => {
        if (booth.status !== BoothStatus.AVAILABLE) {
          return toast.error(`Booth ${booth.name} is not available`, {
            position: 'top-center'
          });
        }
        if (typeof selectEntity === 'function') {
          selectEntity(booth.name);
        }
      },
    });
  }, [extendedEntities, selectEntity, isReady]);


  return (
    <div
      ref={containerRef}
      className={cn('w-full h-full', className)}
    />
  );
}

export default memo(Viewer);
