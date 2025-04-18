import { useEffect, useRef } from 'react';

function Modal({ content, setSelectedItem }) {
    const dialogRef = useRef();

    useEffect(() => {
        if (content === null)  {
            if (dialogRef.current) {
                dialogRef.current.close();
            }
        } else {
            if (dialogRef.current) {
                dialogRef.current.showModal();
            }
        }
    }, [content]);


    return (
        <dialog className="dialog" ref={dialogRef} aria-labelledby="dialog-heading">
            <div className="dialog-header">
                <h2 id="dialog-heading" tabIndex="-1">{content?.title}</h2>
                <button className="btn primary" onClick={() => setSelectedItem(null)}>Close modal</button>
            </div>
            <div className="dialog-content">
                {content?.images && content?.images?.length && (
                    <div>
                        <img src={content.images[0].thumb} alt={content.images[0].caption}/>
                    </div>
                )}
                <div className="text-content">
                    <p><span>Artist:</span> {content?.maker}</p>
                    <p><span>Description:</span> {content?.description}</p>
                    <p><span>Additional information:</span> {content?.additionalData}</p>
                    <p><span>Materials:</span> {content?.materials}</p>
                    <p><span>Measurements:</span> {content?.measurements}</p>
                    <p><span>Crime category:</span> {content?.crimeCategory}</p>
                </div>
            </div>
        </dialog>
    )
}
export default Modal;