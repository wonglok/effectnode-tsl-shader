import md5 from 'md5';
import { useApp } from '../CanvasEditor/AppContext';

export const useActiveNode3D = () => {
    let activeNodeHash = useApp((r) => r.activeNodeHash);
    let renderTree = useApp((r) => r.renderTree);

    let activeNode: any = false;

    renderTree?.traverse((tree: any) => {
        let hash = `${md5(`${tree.userData?.geometryHash}${tree.userData?.materialHash}`)}`;
        if (hash === activeNodeHash) {
            if (!activeNode) {
                activeNode = tree;
            }
        }
    });

    return activeNode;
};
