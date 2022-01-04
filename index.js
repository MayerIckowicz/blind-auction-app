const bid = document.querySelector(".bid");
const next = document.querySelector(".placebid");
const end = document.querySelector(".end");
const nameBid = document.querySelector(".name");
const auction = document.querySelector(".auction");
const item = document.querySelector(".item");
const start = document.querySelector(".start__btn");
const minPrice = document.querySelector(".minprice");
const auctionItem = document.querySelector(".auctionItem");
const itemDisplay = document.querySelector(".item__display");
const priceDisplay = document.querySelector(".price__display");
const auctionResultH1 = document.querySelector(".h1__result");
const auctionResultH2 = document.querySelector(".h2__result");
const auctionResult = document.querySelector(".auction__result");

const PASSWORD = "123456";

let bids = new Array();

const isBidValid = () =>
  +minPrice.value <= +bid.value
    ? addNewBid()
    : alert(
        `Your bid of $${bid.value} does not meet the minimun asking price of: $${minPrice.value}. Please try again`
      );

const addNewBid = function () {
  const name = nameBid.value;
  const bid1 = bid.value;
  bids.push({ person: name, bid: bid1 });
  showBidSuccess();
  nameBid.value = "";
  bid.value = "";
  console.log(bids);
};

const checkWinner = function () {
  if (bids.length == 0) {
    alert("There were no bidders for this item");
    location.reload();
    return;
  }
  bids.sort((a, b) => Number(b.bid) - Number(a.bid));
  console.log(bids);
  const winners = bids.filter((b) => b.bid == bids[0].bid);
  console.log(winners);
  if (winners.length > 1) {
    let drawBids = new Array();
    winners.map((el) => drawBids.push(el.person));
    console.log(drawBids.join(", "));
    auctionResultH2.innerHTML = drawBids.join(", ");
    auctionResultH1.innerHTML = `There was a tie in the auction between: `;
    displayAuctionResults();
    backButton();
    const backBtn = document.querySelector(".back__btn");
    backBtn.addEventListener("click", () => {
      auctionResult.classList.add("hidden");
      auction.classList.remove("hidden");
      backBtn.remove();
    });
    priceDisplay.innerHTML = `The minimun price in this round is: $${winners[0].bid}`;
  } else {
    console.log(
      `the winner is: ${winners[0].person} with a bid of: ${winners[0].bid}`
    );

    localStorage.setItem(
      JSON.stringify(auctionItem.value),
      JSON.stringify(winners)
    );
    displayAuctionResults();
    auctionResultH1.innerHTML = `The winner is: ${winners[0].person} with a bid of: ${winners[0].bid}`;
    backButton();
    const backBtn = document.querySelector(".back__btn");
    backBtn.innerHTML = `Start new auction`;
    backBtn.addEventListener("click", () => {
      auctionResult.classList.add("hidden");
      item.classList.remove("hidden");
      backBtn.remove();
    });
    bids = [];
    auctionItem.value = "";
    minPrice.value = "";
  }
};

const endAuction = () => {
  if (PASSWORD == nameBid.value) {
    checkWinner();
    nameBid.value = "";
  } else {
    alert(`invalid password, please put the password on the "name" field and click end action. 
    The password is ${PASSWORD}`);
    console.log("invalid password");
  }
};

const displayAuctionResults = () => {
  auction.classList.add("hidden");
  auctionResult.classList.remove("hidden");
};

const showBidSuccess = () => {
  displayAuctionResults();
  auctionResultH1.innerHTML = ` ${nameBid.value}, your bid of: $${bid.value} was placed successfully`;
  auctionResultH1.style.fontSize = "4rem";
  auctionResultH2.innerHTML = "";
  setTimeout(() => {
    auction.classList.remove("hidden");
    auctionResult.classList.add("hidden");
  }, 2000);
};

const drawSecoundRound = () => {};

const backButton = () => {
  const backB = document.createElement("button");
  const backBText = document.createTextNode("Back to auction");
  backB.appendChild(backBText);
  backB.classList.add("back__btn");
  auctionResult.appendChild(backB);
};

next.addEventListener("click", isBidValid);
end.addEventListener("click", endAuction);

const startAuction = () => {
  auction.classList.remove("hidden");
  item.classList.add("hidden");
  itemDisplay.innerHTML = `The item is: ${auctionItem.value}`;
  priceDisplay.innerHTML = `The minimun asking price is: $${minPrice.value}`;
};

start.addEventListener("click", startAuction);
