import { Handle, Position, useEdges, useNodeId, useNodes } from '@xyflow/react';
import { getActiveO3D, useApp } from '../../CanvasEditor/AppContext';
import { useEffect, useMemo, useRef, useState } from 'react';

export function TextureEditor({ data, ...others }: any) {
    let div = useRef<HTMLDivElement | null>(null);

    let renderTree = useApp((r) => r.renderTree);

    let activeNodeHash = data.activeNodeHash;

    let o3d = useMemo(() => {
        return getActiveO3D(renderTree, activeNodeHash);
    }, [renderTree, activeNodeHash]);

    let [show, setShow] = useState<HTMLCanvasElement>();

    let nodes = useNodes();
    let edges = useEdges();
    let nodeId = useNodeId();

    let edge = edges.find((r) => r.source === nodeId);

    let canvsEl = useMemo(() => {
        let mat: any = o3d?.material || {};

        let texture = mat[`${edge?.targetHandle}`];

        let image = texture?.image;

        let bitmap = image;

        if (!bitmap) {
            return false;
        }

        let canvas = drawImageBitmapToCanvas(bitmap);

        setShow(canvas);

        // return drawImageBitmapToCanvas(bitmap);
    }, [o3d, edge]);

    useEffect(() => {
        if (div.current && canvsEl) {
            div.current.appendChild(canvsEl);
        }
    }, [canvsEl]);

    //

    return (
        <div className='flex flex-col items-start justify-center border rounded-2xl pb-3 bg-[rgba(255,255,255,0.5)]'>
            <div className=' hover:bg-gray-100 w-full'>
                <div className='relative p-3 drag-handle__custom'>
                    <div className='text-center'>Texture</div>
                    <div className='text-center'>{edge?.targetHandle}</div>
                    <Handle style={{ width: '13px', height: '13px' }} position={Position.Left} type='source' id={'texture'}></Handle>
                </div>
                <div className='mx-2'>
                    <div className={`w-64 h-64 rounded-2xl overflow-hidden bg-white`}>
                        {/*  */}
                        {show && <DOMInsertionComponent externalDomNode={show}></DOMInsertionComponent>}
                        {/*  */}
                    </div>
                </div>
            </div>
        </div>
    );
}

function drawImageBitmapToCanvas(bitmap: ImageBitmap) {
    // 1. Get the canvas element and context
    const canvas = document.createElement('canvas'); // You can also use an existing canvas element from the DOM
    canvas.width = bitmap.width; // Set canvas size to match the bitmap size
    canvas.height = bitmap.height;

    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D; // Get the 2D rendering context

    // 2. Draw the ImageBitmap onto the canvas
    // The simplest syntax is drawImage(imageSource, dx, dy)
    ctx.drawImage(bitmap, 0, 0); // Draws the bitmap at the top-left corner (0, 0)

    // At this point, the ImageBitmap is rendered into the canvas.
    // You can now append the canvas to the DOM or perform other operations.

    // If you need the raw pixel data (ImageData object) from the canvas:
    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // return imageData;

    return canvas;
}

function DOMInsertionComponent({ externalDomNode }: any) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Ensure the external DOM node exists and the ref is attached
        if (containerRef.current && externalDomNode) {
            containerRef.current.appendChild(externalDomNode);
        }

        // Optional cleanup function to remove the node when the component unmounts
        return () => {
            if (containerRef.current && externalDomNode) {
                containerRef.current.removeChild(externalDomNode);
                externalDomNode.remove();
            }
        };
    }, [externalDomNode]); // Rerun effect if the external node changes

    // Return a React element that serves as the container
    return <div ref={containerRef} className='w-full h-full' />;
}
