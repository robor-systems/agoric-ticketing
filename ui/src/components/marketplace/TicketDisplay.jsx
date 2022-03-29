import React, { useEffect, useState } from 'react';
import { useApplicationContext } from '../../context/Application';
import { getFilteredList } from '../../helpers/searchBar';
import Loader from '../common/Loader';
import Pagination from '../common/Pagination';
// import { tickets } from '../../tickets';
import TicketCard from './components/TicketCard';

const TicketDisplay = () => {
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(0);
  const pageLength = 2;
  const {
    state: { searchInput, searchOption, availableCards },
  } = useApplicationContext();
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    setEventList(
      getFilteredList(
        availableCards,
        searchInput,
        searchOption,
        page,
        page + pageLength,
      ),
    );
    if (availableCards.length > 0) setLoader(false);
  }, [searchInput, searchOption, availableCards, page]);

  return (
    <>
      {' '}
      {!loader ? (
        <>
          {' '}
          <div className="w-full">
            {eventList.map((ticket, i) => (
              <TicketCard key={i} cardDetail={ticket} />
            ))}
          </div>
          <Pagination
            page={page}
            pageLength={pageLength}
            total={availableCards.length}
            onNext={() => {
              console.log('page:', page);
              if (page === availableCards.length - 1) return;
              setPage((pg) => pg + pageLength);
            }}
            onPrev={() => {
              if (page === 0) return;
              setPage((pg) => pg - pageLength);
            }}
          />
        </>
      ) : (
        <div className="w-full flex flex-row items-center justify-center">
          <Loader />
          <p className="text-lg font-normal pl-4 animate-pulse">
            fetching events...
          </p>
        </div>
      )}
    </>
  );
};

export default TicketDisplay;
