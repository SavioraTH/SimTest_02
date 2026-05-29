// 1. ดึงฐานข้อมูลดิบจากไฟล์ Simulator V2.5 ทั้งหมดมารวบรวมไว้ที่นี่
const db = {
    packages: {
        "QSDS_North_86_Zinc": { name: "QSDS_North 8*6 (สังกะสี)", roomCost: 35260, fieldCost: 30000, maxSheets: 3, desc: "โรงเลี้ยงขนาดมาตรฐาน 8*6 เมตร หลังคาสังกะสี" },
        "QSDS_North_86_Tile": { name: "QSDS_North 8*6 (กระเบื้อง)", roomCost: 34520, fieldCost: 40000, maxSheets: 3, desc: "โรงเลี้ยงขนาดมาตรฐาน 8*6 เมตร หลังคากระเบื้อง" },
        "QSDS_46": { name: "QSDS 4*6", roomCost: 7000, fieldCost: 4400, maxSheets: 2, desc: "โรงเลี้ยงขนาดเล็ก 4*6 เมตร เลี้ยงได้ 2 แผ่น/รุ่น" },
        "QSDS_68": { name: "QSDS 6*8", roomCost: 12000, fieldCost: 8800, maxSheets: 3, desc: "โรงเลี้ยงขนาดมาตรฐาน 6*8 เมตร เลี้ยงได้ 3 แผ่น/รุ่น" },
        "QSDS_812": { name: "QSDS 8*12", roomCost: 30000, fieldCost: 22000, maxSheets: 10, desc: "โรงเลี้ยงขนาดใหญ่ 8*12 เมตร เลี้ยงได้ 10 แผ่น/รุ่น" },
        "QSDS_816": { name: "QSDS 8*16", roomCost: 35000, fieldCost: 33000, maxSheets: 12, desc: "โรงเลี้ยงขนาดใหญ่พิเศษ 8*16 เมตร เลี้ยงได้ 12 แผ่น/รุ่น" }
    },
    mulberry: {
        "บุรีรัมย์ 60": { yieldPerRai: 4328, desc: "ผลผลิตสูงมาก ตอบสนองต่อปุ๋ยดี แต่ต้องการน้ำพอเพียง" },
        "นครราชสีมา 60": { yieldPerRai: 3600, desc: "ต้านทานโรคราแป้งได้ดี ให้ผลผลิตสูงสม่ำเสมอ" },
        "สกลนคร": { yieldPerRai: 2500, desc: "ทนแล้งได้ดีกว่าบุรีรัมย์ 60 และต้านทานโรครากเน่า" },
        "สกลนคร 85": { yieldPerRai: 3407, desc: "ทนแล้งสูง ให้ผลผลิตดีแม้ในเขตเกษตรอาศัยน้ำฝน" },
        "ศรีสะเกษ 33": { yieldPerRai: 1500, desc: "ต้านทานโรคใบด่างได้ดี ใบร่วงช้า เก็บเกี่ยวได้นาน" },
        "บุรีรัมย์ 51": { yieldPerRai: 1960, desc: "ทนแล้งได้ดี ต้านทานโรคใบด่างปานกลาง" },
        "ศรีสะเกษ 84": { yieldPerRai: 2120, desc: "แนะนำสำหรับเขต 1: ทนแล้งและต้านทานโรคราสนิมได้ดีเยี่ยม" },
        "เชียงใหม่ 60": { yieldPerRai: 1000, desc: "ผลใหญ่และกรดสูง เหมาะสำหรับการแปรรูป" }
};
    silk: {
        "เหลืองสระบุรี":
        { cocoonYield: 20, silkYield: 2.75, pupaYield: 15, leafNeed: 475, priceCocoon: 200, priceSilk: 2000, pricePupa: 105 },
        "ไทยลูกผสม (อุบล 60-35)":
        { cocoonYield: 20, silkYield: 1.75, pupaYield: 13, leafNeed: 375, priceCocoon: 145, priceSilk: 1850, pricePupa: 100 },
        "ไทยลูกผสม (สกลนคร)":
        { cocoonYield: 22, silkYield: 2.00, pupaYield: 15, leafNeed: 425, priceCocoon: 145, priceSilk: 1850, pricePupa: 100 }
        "พันธุ์พื้นเมือง (นางน้อย/นางลาย)":
        { cocoonYield: 11, silkYield: 1.00, pupaYield: 9, leafNeed: 600, priceCocoon: 120, priceSilk: 2300, pricePupa: 90 }
        "ศรีสะเกษ 72 (ทับทิมสยาม 06 X วนาสวรรค์)":
        { cocoonYield: 25, silkYield: 1.35, pupaYield: 11, leafNeed: 500, priceCocoon: 135, priceSilk: 1950, pricePupa: 100 }
    }
};

function updatePackageInfo() {
    const pkgKey = document.getElementById('package').value;
    document.getElementById('package-desc').innerText = db.packages[pkgKey].desc;
}

// รันฟังก์ชันแสดงผลอธิบาย Package ครั้งแรกตอนเปิดแอป
updatePackageInfo();

function runSimulation() {
    // ดึงค่าอินพุตจากที่เจ้าหน้าที่กรอกหน้างาน
    const pkgKey = document.getElementById('package').value;
    const mulberryKey = document.getElementById('mulberry').value;
    const silkKey = document.getElementById('silk').value;
    const sheets = parseFloat(document.getElementById('sheets').value);
    const userArea = parseFloat(document.getElementById('user-area').value);

    const selectedPkg = db.packages[pkgKey];
    const selectedMul = db.mulberry[mulberryKey];
    const selectedSilk = db.silk[silkKey];

    // --- ส่วนสูตรคำนวณระบบหม่อนและปริมาณแผ่น ---
    const leafNeededPerCycle = sheets * selectedSilk.leafNeed; // ปริมาณใบหม่อนที่ใช้ต่อรุ่น
    const totalLeafNeededYear = leafNeededPerCycle * 6; // เลี้ยงปีละ 6 รุ่น
    const areaRequired = totalLeafNeededYear / selectedMul.yieldPerRai; // พื้นที่ปลูกหม่อนที่ต้องการจริง (ไร่)
    const treesRequired = Math.ceil(areaRequired * 750); // ระยะปลูกแถวเดี่ยว 750 ต้น/ไร่

    // แสดงผลข้อมูลพืชและแปลงหม่อน
    document.getElementById('res-area-req').innerText = areaRequired.toFixed(2) + " ไร่";
    document.getElementById('res-trees').innerText = treesRequired.toLocaleString() + " ต้น";

    // --- ส่วนเช็คความพร้อมเงื่อนไขขั้นต่ำ (Minimum Request) ---
    const alertBox = document.getElementById('request-check');
    alertBox.style.display = "block";
    
    if (sheets > selectedPkg.maxSheets) {
        alertBox.className = "alert danger";
        alertBox.innerHTML = `⚠️ เกินขีดจำกัด! โรงเลี้ยงนี้รองรับได้สูงสุดเพียง ${selectedPkg.maxSheets} แผ่น/รุ่น (คุณเลือกเลี้ยง ${sheets} แผ่น)`;
        document.getElementById('results').style.display = "none";
        return; 
    }

    if (userArea < areaRequired) {
        alertBox.className = "alert danger";
        alertBox.innerHTML = `⚠️ พื้นที่แปลงหม่อนไม่พอ! เกษตรกรมีพื้นที่ ${userArea} ไร่ แต่ต้องการพื้นที่ปลูกหม่อนขั้นต่ำ ${areaRequired.toFixed(2)} ไร่ เพื่อให้พอเลี้ยงไหมจำนวน ${sheets} แผ่น`;
        document.getElementById('results').style.display = "none";
        return;
    } else {
        alertBox.className = "alert success";
        alertBox.innerHTML = `✅ เงื่อนไขผ่านความพร้อมหน้างาน: แปลงหม่อนและโรงเรือนมีความสมดุลเพียงพอสำหรับเกณฑ์จุลไหมไทย`;
        document.getElementById('results').style.display = "block";
    }

    // --- ส่วนสูตรคำนวณการเงิน (Financial Logic) ---
    const toolCostFirstTime = 14445; // ค่าอุปกรณ์พัสดุสิ้นเปลืองตั้งต้นคงที่ในระบบ V1
    const totalInvestment = selectedPkg.roomCost + selectedPkg.fieldCost + toolCostFirstTime;
    
    document.getElementById('res-invest').innerText = totalInvestment.toLocaleString() + " บาท";
    document.getElementById('res-invest-detail').innerHTML = `
        - ค่าสร้างโรงเลี้ยง: ${selectedPkg.roomCost.toLocaleString()} บาท<br>
        - ค่าจัดตั้งแปลงหม่อน: ${selectedPkg.fieldCost.toLocaleString()} บาท<br>
        - ค่าอุปกรณ์และวัสดุสิ้นเปลือง: ${toolCostFirstTime.toLocaleString()} บาท
    `;

    // คำนวณรายได้ (Revenue) ต่อปี (6 รุ่น)
    const revenueFreshYear = (sheets * selectedSilk.cocoonYield * selectedSilk.priceCocoon) * 6;
    const revenueSpinYear = ((sheets * selectedSilk.silkYield * selectedSilk.priceSilk) + (sheets * selectedSilk.pupaYield * selectedSilk.pricePupa)) * 6;

    document.getElementById('res-rev-fresh').innerText = revenueFreshYear.toLocaleString() + " บาท/ปี";
    document.getElementById('res-rev-spin').innerText = revenueSpinYear.toLocaleString() + " บาท/ปี";

    // คำนวณต้นทุนดำเนินงานจ่ายจริง (คิดตามอัตรา V1 จ่ายจริงรุ่นละ 2,110 บาท และค่าบำรุงแปลงหม่อน 7,950 บาท/ปี)
    const costPerCycle = 2110;
    const fieldMaintenanceYear = 7950;
    const totalOperatingCostYear = (costPerCycle * 6) + fieldMaintenanceYear;

    // รายได้หักต้นทุนจ่ายจริงต่อครั้ง (คำนวณจากรูปแบบขายรังสด)
    const revenuePerCycle = (sheets * selectedSilk.cocoonYield * selectedSilk.priceCocoon);
    const netProfitPerCycle = revenuePerCycle - costPerCycle;
    const netProfitYear = revenueFreshYear - totalOperatingCostYear;

    // การคำนวณรอบและระยะเวลาคืนทุน
    const cyclesToPayback = totalInvestment / netProfitPerCycle;
    const yearsToPayback = totalInvestment / netProfitYear;

    document.getElementById('res-net-per-cycle').innerText = netProfitPerCycle.toLocaleString() + " บาท";
    document.getElementById('res-cycles-req').innerText = cyclesToPayback.toFixed(2) + " รอบ";
    document.getElementById('res-payback').innerText = yearsToPayback > 0 ? yearsToPayback.toFixed(2) + " ปี" : "ไม่สามารถคืนทุนได้เนื่องจากขาดทุนดำเนินงาน";
}
