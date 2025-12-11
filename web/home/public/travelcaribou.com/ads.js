
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

/*Set Prebid Config Variables*/
var PREBID_TIMEOUT = '700';
var FAILSAFE_TIMEOUT = '1400';
var BIDDER_SEQUENCE = "random";
var BID_CACHE = "true";
prebidFloor = 0.15;

/*Sizes*/
if ( window.innerWidth < 350 ) {
    sticky_sizes = [[320, 100], [320, 50], [320, 60], [300, 100], [300, 50], [1, 1]];
} else if (window.innerWidth >= 350 && window.innerWidth < 500) {
    sticky_sizes = [[320, 100], [320, 50], [320, 60], [300, 100], [300, 50], [468, 60], [1, 1]];
} else if (window.innerWidth >= 500 && window.innerWidth < 800) {
    sticky_sizes = [[728, 90], [1, 1]];
} else if (window.innerWidth >= 800 && window.innerWidth < 1100) {
    sticky_sizes = [[728, 90], [1, 1]];
} else if (window.innerWidth >= 1100) {
    sticky_sizes = [[728, 90], [1, 1]];
}

var header_sizes = [
    [728, 90], [468, 60], [320, 100], [300, 100], [320, 50], [300, 50]
];
var sizes = [
    [336, 280], [300, 250], [250, 250], [320, 100], [300, 100], [320, 50], [300, 50], [300, 300], [320, 320]
];
var pb_sizes = [
    [336, 280], [300, 250], [250, 250], [320, 100], [300, 100], [320, 50], [300, 50], [300, 300], [320, 320], [1,1]
];
var sidebar = [
    [300, 600], [300, 250], [250, 250], [320, 100], [300, 100], [320, 50], [300, 50], [300, 300], [1,1]
];
var pb_sidebar = [
    [300, 600], [300, 250], [250, 250], [320, 100], [300, 100], [320, 50], [300, 50], [300, 300], [1,1]
];
var sidebar_mpu = [
    [300, 250], [250, 250], [320, 100], [300, 100], [320, 50], [300, 50], [300, 300], [1,1]
];

const REFRESH_TIMEOUT = 30 * 1000;  // 30 seconds 
const slots = [{
        id: '/22243498338/header',
        sizes:  header_sizes,
        divId: 'static-ad-1',
        shouldRefresh: false
    },
    {
        id: '/22243498338/incontent',
        sizes:  sizes,
        divId: 'static-ad-2',
        shouldRefresh: false
    },
    {
        id: '/22243498338/incontent_2',
        sizes:  sizes,
        divId: 'static-ad-2a',
        shouldRefresh: false
    },
    {
        id: '/22243498338/belowcontent',
        sizes:  header_sizes,
        divId: 'static-ad-3',
        shouldRefresh: false
    },
    {
        id: '/22243498338/sidebartop',
        sizes:  sidebar,
        divId: 'static-ad-4',
        shouldRefresh: false
    },
    {
        id: '/22243498338/sidebarmid',
        sizes:  sidebar_mpu,
        divId: 'static-ad-5',
        shouldRefresh: true
    },
    {
        id: '/22243498338/sidebarbtm',
        sizes:  sidebar,
        divId: 'static-ad-6',
        shouldRefresh: false
    },
    {
        id: '/22243498338/sidebarend',
        sizes:  sidebar_mpu,
        divId: 'static-ad-7',
        shouldRefresh: false
    },
    {
        id: '/22243498338/sidebarmid2',
        sizes:  sidebar_mpu,
        divId: 'static-ad-8',
        shouldRefresh: false
    },
    {
        id: '/22243498338/anchor',
        sizes:  sticky_sizes,
        divId: 'anchor',
        shouldRefresh: false
    }]

const getPageState = () => {
  if (document.visibilityState === 'hidden') {
    return 'hidden';
  }
  if (document.hasFocus()) {
    return 'active';
  }
  return 'passive';
};

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getVisibleDimensions(element) {
    const { top, bottom, left, right } = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const visibleHeight = Math.min(bottom, viewportHeight) - Math.max(top, 0);
    const visibleWidth = Math.min(right, viewportWidth) - Math.max(left, 0);
    
    return { visibleHeight, visibleWidth };
}

function isVisible(element) {
    if (!element) return false;

    const { visibleHeight, visibleWidth } = getVisibleDimensions(element);
    
    return visibleHeight > 0 && visibleWidth > 0;
}

function isVisibleById(elementId) {
    return isVisible(document.getElementById(elementId));
}

function getVisiblePercentage(element) {
    if (!element) return 0;

    const { visibleHeight, visibleWidth } = getVisibleDimensions(element);

    const visibleArea = visibleHeight * visibleWidth;
    const totalArea = element.offsetWidth * element.offsetHeight;

    return (visibleArea / totalArea) * 100;
}

function getVisiblePercentageById(elementId) {
    return getVisiblePercentage(document.getElementById(elementId));
}

function refresh(slot) {
    if (getPageState() !== 'hidden' && getVisiblePercentageById(slot.divId) > 60) {
        pbjs.que.push(function() {
            pbjs.requestBids({
                timeout: PREBID_TIMEOUT,
                adUnitCodes: [slot.divId],
                bidsBackHandler: function() {
                    pbjs.setTargetingForGPTAsync([slot.id]);
                    googletag.pubads().refresh([slot.instance]);
                }
            });
        });
    } else {
        setTimeout(() => {
            refresh(slot)
        }, REFRESH_TIMEOUT)
    }
}

googletag.cmd.push(function() {
    
    const interstitialSlot = googletag.defineOutOfPageSlot(
            '/22243498338/interstitial',
            googletag.enums.OutOfPageFormat.INTERSTITIAL);
            
        if (interstitialSlot) {
          interstitialSlot
            .addService(googletag.pubads());
          
            googletag.pubads().addEventListener('slotOnload', function(event) {
                if (interstitialSlot === event.slot) {
                    document.getElementById('pagination_wrap').style.display = 'block';
                }
            });
        }

    
    slots.forEach( slot => {
        slot.instance = googletag.defineSlot(slot.id, slot.sizes, slot.divId).addService(googletag.pubads());
    })

    googletag.pubads().enableSingleRequest();
    googletag.pubads().setTargeting('splitTest', '74');
    googletag.pubads().setTargeting('prebidTimeout', '700');
    googletag.pubads().setTargeting('prebidBidderSequence', 'random');
    googletag.pubads().setTargeting('prebidPricingRule', 'Optimised');
    googletag.pubads().setTargeting('prebidInterFloor', 'Optimised');
    googletag.pubads().setTargeting('prebidFloor', '0.15');
    googletag.pubads().disableInitialLoad();
    googletag.enableServices();
    googletag.pubads().addEventListener("slotRenderEnded", (event) => {
        const slot = event.slot;
        // console.group("Slot", slot.getSlotElementId(), "finished rendering.");

        // // Log details of the rendered ad.
        // console.log("Advertiser ID:", event.advertiserId);
        // console.log("Campaign ID:", event.campaignId);
        // console.log("Company IDs:", event.companyIds);
        // console.log("Creative ID:", event.creativeId);
        // console.log("Creative Template ID:", event.creativeTemplateId);
        // console.log("Is backfill?:", event.isBackfill);
        // console.log("Is empty?:", event.isEmpty);
        // console.log("Label IDs:", event.labelIds);
        // console.log("Line Item ID:", event.lineItemId);
        // console.log("Size:", event.size);
        // console.log("Slot content changed?", event.slotContentChanged);
        // console.log("Source Agnostic Creative ID:", event.sourceAgnosticCreativeId);
        // console.log("Source Agnostic Line Item ID:", event.sourceAgnosticLineItemId);
        // console.log("Yield Group IDs:", event.yieldGroupIds);
        // console.groupEnd();

        const targetSlot = slots.find( sl => sl.instance === slot )

        if (targetSlot) {
            if(targetSlot.shouldRefresh) {

                setTimeout(() => {
                    refresh(targetSlot)
                }, REFRESH_TIMEOUT)

            }
        }
    });
});

//load the apstag.js library
!function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q("f",arguments)},setDisplayBids:function(){},targetingKeys:function(){return[]},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");

// initialize apstag and have apstag set bids on the googletag slots when they are returned to the page
apstag.init({
    pubID: '2c8bbfd2-3065-4153-9ab1-12be7e7918a6',
    adServer: 'googletag'
});

// request the bids for the four googletag slots
apstag.fetchBids({
    slots: [{
      slotID: 'static-ad-1',
      slotName: '/22243498338/header',
      sizes: header_sizes
    },{
      slotID: 'static-ad-2',
      slotName: '/22243498338/incontent',
      sizes: pb_sizes
    },
    {
      slotID: 'static-ad-2a',
      slotName: '/22243498338/incontent_2',
      sizes: pb_sizes
    },
    {
      slotID: 'static-ad-3',
      slotName: '/22243498338/belowcontent', 
      sizes: header_sizes
    },
    {
      slotID: 'static-ad-4',
      slotName: '/22243498338/sidebartop', 
      sizes: pb_sidebar
    },
    {
      slotID: 'static-ad-5',
      slotName: '/22243498338/sidebarmid', 
      sizes: sidebar_mpu
    },
    {
      slotID: 'static-ad-6',
      slotName: '/22243498338/sidebarbtm', 
      sizes: pb_sidebar
    },
    {
      slotID: 'static-ad-7',
      slotName: '/22243498338/sidebarend', 
      sizes: sidebar_mpu
    },
    {
      slotID: 'static-ad-8',
      slotName: '/22243498338/sidebarmid2', 
      sizes: sidebar_mpu
    },
    {
      slotID: 'anchor',
      slotName: '/22243498338/anchor', 
      sizes: sticky_sizes
    }],
    timeout: 2e3
}, function(bids) {
    // set apstag bids, then trigger the first request to GAM
    googletag.cmd.push(function() {
        apstag.setDisplayBids();
        /*googletag.pubads().refresh();*/
    });
});

if(PREBID_TIMEOUT == null){
    var PREBID_TIMEOUT = 400;
}
if(FAILSAFE_TIMEOUT == null){
    var FAILSAFE_TIMEOUT = 800;
}

var adUnits = [{
    code: 'static-ad-1',
    mediaTypes: {
        banner: { sizes: header_sizes }
    },
    bids: [{
        bidder: 'medianet',
        params: {
            cid: '8CU1CQ11V',
            crid: '567583576',
            bidfloor: prebidFloor
        }
    },{
        bidder: 'ix', 
        params: { 
            siteId: '931782'
        }
    },{
        bidder: 'rubicon',
        params: {
            accountId: '25564',  
            siteId: '482272',
            zoneId: '2861422',
            floor: prebidFloor
        }
    }]
},{
    code: 'static-ad-2',
    mediaTypes: {
        banner: { sizes: pb_sizes }
    },
    bids: [{
        bidder: 'medianet',
        params: {
            cid: '8CU1CQ11V',
            crid: '940311517',
            bidfloor: prebidFloor
        }
    },
    {
        bidder: 'ix', 
        params: { 
            siteId: '931777'
        }
    },
    {
        bidder: 'rubicon',
        params: {
            accountId: '25564',  
            siteId: '482272',
            zoneId: '2861418',
            floor: prebidFloor
        }
    }]
},{
    code: 'static-ad-2a',
    mediaTypes: {
        banner: { sizes: pb_sizes }
    },
    bids: [{
        bidder: 'medianet',
        params: {
            cid: '8CU1CQ11V',
            crid: '940311517',
            bidfloor: prebidFloor
        }
    },
    {
        bidder: 'ix', 
        params: { 
            siteId: '931777'
        }
    },
    {
        bidder: 'rubicon',
        params: {
            accountId: '25564',  
            siteId: '482272',
            zoneId: '2861418',
            floor: prebidFloor
        }
    }]
},{
    code: 'static-ad-3',
    mediaTypes: { 
        banner: { sizes: header_sizes }
    },
    bids: [{
        bidder: 'medianet',
        params: {
            cid: '8CU1CQ11V',
            crid: '708145535',
            bidfloor: prebidFloor
        }
    },
    {
        bidder: 'ix', 
        params: { 
            siteId: '931778'
        }
    },
    {
        bidder: 'rubicon',
        params: {
            accountId: '25564',  
            siteId: '482272',
            zoneId: '2861420',
            floor: prebidFloor
        }
    }]
},{
    code: 'static-ad-4',
    mediaTypes: { 
        banner: { sizes: pb_sidebar}
    },
    bids: [{
        bidder: 'medianet', 
        params: { 
            cid: '8CU1CQ11V',
            crid: '708145535',
            bidfloor: prebidFloor
        }
    },
    {
        bidder: 'ix', 
        params: {
            siteId: '931779'
        }
    },
    {
        bidder: 'rubicon',
        params: {
            accountId: '25564',  
            siteId: '482272',
            zoneId: '2861416',
            floor: prebidFloor
        }
    }]
},{
    code: 'static-ad-5',
    mediaTypes: {
        banner: { sizes: sidebar_mpu }
    },
    bids: [{
        bidder: 'medianet', 
        params: { 
            cid: '8CU1CQ11V',
            bidfloor: '0',
            crid: '708145535'
        }
    },
    {
        bidder: 'ix', 
        params: { 
            siteId: '931780'
        }
    },
    {
        bidder: 'rubicon',
        params: {
            accountId: '25564',  
            siteId: '482272',
            zoneId: '2861416',
            floor: prebidFloor
        }
    }]
},{
    code: 'static-ad-6',
    mediaTypes: {
        banner: { sizes: pb_sidebar }
    },
    bids: [{
        bidder: 'medianet', 
        params: { 
            cid: '8CU1CQ11V',
            crid: '708145535',
            bidfloor: prebidFloor
        }
    },
    {
        bidder: 'ix', 
        params: { 
            siteId: '931780'
        }
    },
    {
        bidder: 'rubicon',
        params: {
            accountId: '25564',  
            siteId: '482272',
            zoneId: '2861416',
            floor: prebidFloor
        }
    }]
},{
    code: 'static-ad-7',
    mediaTypes: {
        banner: { sizes: sidebar_mpu }
    },
    bids: [{
        bidder: 'medianet', 
        params: { 
            cid: '8CU1CQ11V',
            crid: '708145535',
            bidfloor: prebidFloor
        }
    },
    {
        bidder: 'ix', 
        params: { 
            siteId: '931780'
        }
    },
    {
        bidder: 'rubicon',
        params: {
            accountId: '25564',  
            siteId: '482272',
            zoneId: '2861416',
            floor: prebidFloor
        }
    }]
},{
    code: 'static-ad-8',
    mediaTypes: {
        banner: { sizes: sidebar_mpu }
    },
    bids: [{
        bidder: 'medianet', 
        params: { 
            cid: '8CU1CQ11V',
            crid: '708145535',
            bidfloor: prebidFloor
        }
    },
    {
        bidder: 'ix', 
        params: { 
            siteId: '931780'
        }
    },
    {
        bidder: 'rubicon',
        params: {
            accountId: '25564',  
            siteId: '482272',
            zoneId: '2861416',
            floor: prebidFloor
        }
    }]
},{
    code: 'anchor',
    mediaTypes: { banner: { sizes: sticky_sizes } },
    bids: [{
        bidder: 'medianet', 
        params: { 
            cid: '8CU1CQ11V',
            crid: '247502766',
            bidfloor: prebidFloor
        }
    },
    {
        bidder: 'ix', 
        params: { 
            siteId: '931781' 
        }
    },
    {
        bidder: 'rubicon',
        params: {
            accountId: '25564',  
            siteId: '482272',
            zoneId: '2861414',
            floor: prebidFloor
        }
    }]
}];

    var pbjs = pbjs || {};
    pbjs.que = pbjs.que || [];

    pbjs.que.push(function() {
        pbjs.bidderSettings = {
            standard: {
                adserverTargeting: [{
                    key: "hb_bidder",
                    val: function(bidResponse) {
                        return bidResponse.bidderCode;
                    }
                }, {
                    key: "hb_adid",
                    val: function(bidResponse) {
                        return bidResponse.adId;
                    }
                }, {
                    key: "hb_pb",
                    val: function(bidResponse) {
                        return bidResponse.pbDg;
                    }
                }, {
                    key: 'hb_size',
                    val: function (bidResponse) {
                        return bidResponse.size;
                    }
                }, {
                    key: 'hb_source',
                    val: function (bidResponse) {
                        return bidResponse.source;
                    }
                }, {
                    key: 'hb_format',
                    val: function (bidResponse) {
                        return bidResponse.mediaType;
                    }
                }]
            },
            criteo: {storageAllowed: true},
            ix: {storageAllowed: true},
        };  
    
        pbjs.setConfig({
            priceGranularity: 'dense',
            enableSendAllBids: true,
            bidderSequence: BIDDER_SEQUENCE,
            useBidCache: BID_CACHE,
            consentManagement: {
                gdpr: {
                    cmpApi: 'iab',
                    timeout: 8000,
                    defaultGdprScope: true
                }
            },
            userSync: {
                iframeEnabled: true,
                filterSettings: {
                    iframe: {
                        bidders: '*',
                        filter: 'include'
                    }
                },
                userIds: [{
                    name: "id5Id",
                    params: {
                        partner: 1265
                    },
                    storage: {
                        type: "html5",
                        name: "id5id",
                        expires: 90,
                        refreshInSeconds: 8*3600
                    }
                }],
                auctionDelay: 50
            },
        }
    );
    
    pbjs.addAdUnits(adUnits);
        pbjs.requestBids({
            bidsBackHandler: initAdserver,
            timeout: PREBID_TIMEOUT
        });
    });
    
    function initAdserver() {
        if (pbjs.initAdserverSet) return;
        pbjs.initAdserverSet = true;
                
        googletag.cmd.push(function() {
            pbjs.que.push(function() {
                pbjs.setTargetingForGPTAsync();
                googletag.pubads().refresh();
            });
        });
    }
    
    
    // in case PBJS doesn't load
    setTimeout(function() {
        initAdserver();
    }, FAILSAFE_TIMEOUT);
            
    googletag.cmd.push(function() {
        googletag.enableServices();
    });

  // Create the variable to store the anchor slot details to be recalled for refreshing 
  var anchorSlot;

  function isAnchorClosed() {
      // Check to see if the anchor is closed using the cookie
      let cookie = {};
      document.cookie.split(";").forEach(function(el) {
          let [k, v] = el.split("=");
          cookie[k.trim()] = v;
      });
      return cookie["anchorClosed"];
  }

  function addAnchorButton(div, fillResult) {
    if (!fillResult.unfilled && !isAnchorClosed()) {
        // Display the ad if the slot is filled and the anchor is open
        document.getElementById('ad-sticky-wrapper').style.display = 'block';
    
        var elements = document.getElementsByClassName('qc-cmp2-persistent-link');
        element = elements[ 0 ];
        if ($(window).width() > 768) {
        element.setAttribute( 'style', 'bottom: 90px !important; transform:none !important; position:fixed; background-color: rgb(54, 139, 214); padding: 5px 15px; color: rgb(255, 255, 255); display: flex; align-items: center; max-height: 30px; z-index: 2147483640; right: 0px;  border-top-left-radius: 3px; border-top-right-radius: 3px;' );
        }
        if ($(window).width() < 767) {
        element.setAttribute( 'style', 'bottom: 60px !important; transform:none !important; position:fixed; background-color: rgb(54, 139, 214); padding: 5px 15px; color: rgb(255, 255, 255); display: flex; align-items: center; max-height: 30px; z-index: 2147483640; right: 0px;  border-top-left-radius: 3px; border-top-right-radius: 3px;' );
        }
        if ($(window).width() < 420) {
        element.setAttribute( 'style', 'bottom: 50px !important; transform:none !important; position:fixed; background-color: rgb(54, 139, 214); padding: 5px 15px; color: rgb(255, 255, 255); display: flex; align-items: center; max-height: 30px; z-index: 2147483640; right: 0px;  border-top-left-radius: 3px; border-top-right-radius: 3px;' );
        }
    }
    if (fillResult.unfilled || isAnchorClosed()) {
        // Do not display the ad if the slot is unfilled or the anchor is closed
        document.getElementById('ad-sticky-wrapper').style.display = 'none';
   }

}

function closeAdButton() {
    // Do not display the ad if the anchor is closed
    var interval;
    document.getElementById('ad-sticky-wrapper').style.display = 'none';
    setAnchorClosed(interval);
    
    var elements = document.getElementsByClassName('qc-cmp2-persistent-link');
    element = elements[ 0 ];
    element.setAttribute( 'style', 'bottom: 0px !important; transform:none !important; position:fixed; background-color: rgb(54, 139, 214); padding: 5px 15px; color: rgb(255, 255, 255); display: flex; align-items: center; max-height: 30px; z-index: 2147483640; right: 0px;  border-top-left-radius: 3px; border-top-right-radius: 3px;' );
}

function setAnchorClosed(interval) {
    // Set a cookie to keep the anchor closed for 30 minutes after the user closed it
    var now = new Date();
    var expMin = 30; // Cookie Expiry in minutes
    now.setTime(now.getTime() + expMin * 60 * 1000);
    document.cookie = "anchorClosed=true; expires=" + now.toUTCString() + ";";
    clearInterval(interval);
}



