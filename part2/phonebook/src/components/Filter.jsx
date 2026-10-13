const Filter = ({ searchFilter, handleFilterChange }) =>
    <form>
        <div>
            filter shown with
            <input
                value={searchFilter}
                onChange={handleFilterChange}
            />
        </div>
    </form>

export default Filter