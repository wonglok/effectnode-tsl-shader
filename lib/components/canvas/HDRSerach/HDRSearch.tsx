import { useEffect, useState } from 'react';
import { VecTools } from './VecTools';
import { Loader, Search } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

export function HDRSearch({ onHDR = ({ hdr }: { hdr: any }) => {} }) {
    let [query, setQuery] = useState('sky');

    let [previews, setPreviws] = useState<any[]>([]);

    let [state, setState] = useState('loading');
    useEffect(() => {
        setState('loading');
        VecTools.onSearchHDR(query)
            .then((images: any[]) => {
                setPreviws(images);
            })
            .finally(() => {
                setState('done');
            });
    }, []);

    return (
        <div className='bg-white p-3 rounded-2xl border'>
            <div
                className='flex'
                onKeyDownCapture={(ev) => {
                    ev.stopPropagation();
                }}
            >
                <Input
                    className=' rounded-r-none border-r-0 h-8 shadow-lg text-xs'
                    value={query}
                    onChange={(ev: any) => {
                        setQuery(ev.target.value);
                    }}
                    onKeyDown={(ev: any) => {
                        if (ev.key === 'Enter') {
                            setState('loading');
                            VecTools.onSearchHDR(query)
                                .then((images: any[]) => {
                                    setPreviws(images);
                                })
                                .finally(() => {
                                    setState('done');
                                });
                        }
                    }}
                ></Input>
                <Button
                    variant={'outline'}
                    className=' rounded-l-none  h-8 shadow-lg text-xs'
                    onClick={() => {
                        setState('loading');
                        VecTools.onSearchHDR(query)
                            .then((images: any[]) => {
                                setPreviws(images);
                            })
                            .finally(() => {
                                setState('done');
                            });
                    }}
                >
                    <Search></Search>
                    Serach
                </Button>
            </div>

            {state === 'loading' && (
                <div className='py-6 w-full flex justify-center items-center'>
                    <Loader className=' animate-spin'></Loader>
                </div>
            )}

            <div className='grid gap-2 grid-cols-2 py-2'>
                {previews &&
                    previews.map((item: any) => {
                        // console.log(item);
                        return (
                            <div className='' key={item.hash}>
                                <img
                                    className=' aspect-video  object-cover rounded-lg cursor-pointer'
                                    onClick={() => {
                                        onHDR({ hdr: item });
                                    }}
                                    src={`${item.cdn}${item.jpg}`}
                                ></img>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
