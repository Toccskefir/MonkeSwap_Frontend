import 'bootstrap/dist/css/bootstrap.css';

function ItemCreation() {
    return(
        <>
            <h1>Create a new card</h1>
            <form>
                <div className="form-group">
                    <label>
                        Image
                        <input type="text" id="inputImage" className="form-control"/>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Title
                        <input type="text" id="inputTitle" className="form-control" placeholder="Item for trade"/>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Description
                        <textarea id="inputDescription" className="form-control" placeholder="This item is..."/>
                    </label>
                </div>

                <button type="submit">Create</button>
            </form>
        </>
    );
}

export default ItemCreation;