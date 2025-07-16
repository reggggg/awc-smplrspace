import { memo, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { loadSmplrJs, type Space } from "@smplrspace/smplr-loader";
import booths from './booths.json';

type Props = {
  className?: React.ComponentProps<'div'>['className'],
  mode?: '2d' | '3d',
  onClick?: (booth: string) => void
}

const Viewer = ({ 
  className,
  mode = '3d',
  onClick
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<Space | null>(null);

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
            space.addPolygonDataLayer({
              id: 'booths',
              data: booths.flatMap(b => b.assets),
              color: () => '#3aa655',
              alpha: 0.7,
              height: 2.9,
              onClick: (booth) => {
                if (onClick) onClick(booth.name);
              },
            });
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
  }, [mode, onClick]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full h-full', className)}
    />
  );
}

export default memo(Viewer);
