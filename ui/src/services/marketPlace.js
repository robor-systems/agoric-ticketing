import { E } from '@agoric/eventual-send';
/*
 * This function should be called when the user puts a card
 * which he own on sale in the secondary marketplace
 */

const sellEventTickets = async ({
  activeCard,
  walletP,
  invitationPurse,
  tokenPurses,
  cardPurse,
}) => {
  const invitation = invitationPurse;
  console.log('invitation Successful:', invitation);
  const offer = {
    id: Date.now(),
    proposalTemplate: {
      give: {
        Asset: {
          pursePetname: cardPurse.pursePetname,
          value: harden([activeCard]),
        },
      },
      want: {
        Price: {
          pursePetname: tokenPurses[0].pursePetname,
          value: BigInt(activeCard.ticketPrice) * 1000000n,
        },
      },
      exit: { onDemand: null },
    },
  };
  try {
    await E(walletP).addOffer(offer);
  } catch (e) {
    console.error('Could not add sell offer to wallet', e);
  }
};
const buyEventTickets = async ({
  activeCard,
  walletP,
  publicFacetMarketPlace,
  tokenPurses,
  cardPurse,
}) => {
  tokenPurses = tokenPurses.reverse();
  let invitation;
  try {
    invitation = await E(publicFacetMarketPlace).makeInvitation();
  } catch (e) {
    console.error('Could not make buyer invitation', e);
  }
  console.log('invitation Successful:', invitation);
  const id = Date.now();
  const proposalTemplate = {
    want: {
      Asset: {
        pursePetname: cardPurse.pursePetname,
        value: harden([activeCard]),
      },
    },
    give: {
      Price: {
        pursePetname: tokenPurses[0].pursePetname,
        value: BigInt(activeCard.ticketPrice) * 1000000n,
      },
    },
    exit: { onDemand: null },
  };
  const offerConfig = { id, invitation, proposalTemplate };
  try {
    await E(walletP).addOffer(offerConfig);
  } catch (e) {
    console.error('Could not add sell offer to wallet', e);
  }
  console.log('offerId:', id);
};
export { buyEventTickets, sellEventTickets };