<?php

class pdf_simplify extends CI_Model
{
	function __construct()
    {
        parent::__construct();
        $this->db2 = $this->load->database('hr', TRUE);
        $this->db3 = $this->load->database('cons', TRUE);
    }

    function reports_mainheader($pdf, $bu, $cutoff, $module)
	{
		$pdf->SetFont('Arial','B',11);
		$pdf->ln(3);
		$pdf->Image(base_url().'assets/img/logo1.png',165,10,25,0,'PNG');		 
		$pdf->Cell(0,0,'ALTURAS GROUP OF COMPANIES',0,0,'L');
		$pdf->ln(6);
		$pdf->SetFont('Arial','B',10);
		$pdf->Cell(0,0,'OTHER DEDUCTION MODULE',0,0,'L');
		$pdf->ln(6);		
		$pdf->Cell(0,0, 'HOUSE ROOFING CREDIT',0,0,'L');		 	
		$pdf->ln(10);
		$pdf->Cell(0,0,$module.'- '.date('F d, Y', strtotime($cutoff)),0,0,'L');
		$pdf->ln(6);
	}


	function reports_tableheader($pdf, $section_name,$header_name,$header_width,$line_counter)
	{
		/*if($line_counter >= 51)
		{
			$pdf->AddPage();
			$line_counter = 0;
		}*/

		$counter      = $this->line_counter_check($pdf,$line_counter);
        $line_counter = $counter;

		$pdf->ln();
		//$pdf->SetFont('Arial','B',9);
		$pdf->SetFont('Arial','',4);
		//$pdf->SetTextColor(225,50,50);
		$pdf->SetTextColor(0,0,0);
		$pdf->Cell(20,7,$section_name,0,0,'L');
		$pdf->SetTextColor(0);
		$pdf->ln();

		for($a=0;$a<count($header_name);$a++)
		{

			/*if($line_counter >= 51)
			{
				$pdf->AddPage();
				$line_counter = 0;
			}	*/
			$counter      = $this->line_counter_check($pdf,$line_counter);
     		$line_counter = $counter;

		   $pdf->Cell($header_width[$a],6,$header_name[$a],1,0,'C',true);	

		   $line_counter+=1;
		}
		

		/*if($line_counter >= 51)
		{
			$pdf->AddPage();
			$line_counter = 0;
		}*/

		$counter      = $this->line_counter_check($pdf,$line_counter);
        $line_counter = $counter;

		/*$pdf->Cell(100,6,'NAME',1,0,'C',true);
		$pdf->Cell(25,6,'DEBIT',1,0,'C',true);
		$pdf->Cell(25,6,'CREDIT',1,0,'C',true);*/
		/*$pdf->Cell(25,6,'BALANCE',1,0,'C');*/
	/*	$pdf->MultiCell(20,3, " Joseph Rian B. Cirunay   Jay  lou" ,1,'L',false);
		$pdf->MultiCell(20,3, " Joseph Rian B. Cirunay   Jay  lou" ,1,'L',false);
		$pdf->MultiCell(20,3, " Joseph Rian B. Cirunay   Jay  lou" ,1,'L',false);
		$pdf->MultiCell(20,3, " Joseph Rian B. Cirunay   Jay  lou" ,1,'L',false);
		$pdf->MultiCell(20,3, "\nJoseph Rian B. Cirunay \n\n Jay  lou" ,1,'L',false);*/
		$pdf->ln();

		$line_counter+= 4;
		return $line_counter;

	}

	function report_company_name($pdf, $company_name,$line_counter)
	{
		/*if($line_counter >= 51)
		{
			$pdf->AddPage();
			$line_counter = 0;
		}*/

		$counter      = $this->line_counter_check($pdf,$line_counter);
        $line_counter = $counter;

		$pdf->ln();	
		$pdf->SetFont('Arial','B',9);
		//$pdf->SetTextColor(0,0,0);
		$pdf->SetTextColor(225,50,50);
		$pdf->Cell(20,7,$company_name,0,0,'L');
		$pdf->SetTextColor(0);
		$pdf->ln();

		$line_counter += 3;
		return $line_counter;
	}



	function reports_subtotal($pdf, $subtotal_balance,$line_counter){
		/*if($line_counter >= 51)
		{
			$pdf->AddPage();
			$line_counter = 0;
		}*/

		$counter      = $this->line_counter_check($pdf,$line_counter);
        $line_counter = $counter;

		$pdf->SetFont('Arial','B',8);
	 	$pdf->Cell(152,6,'SUBTOTAL:',1,0,'R');			
		$pdf->Cell(38,6,number_format($subtotal_balance,2),1,0,'R');
		$pdf->ln();

		$line_counter+=3;
		return $line_counter;
	}



	function line_counter_check($pdf,$line_counter)
	{
		if($line_counter >= 51)
		{
			$pdf->AddPage();
			$line_counter = 0;
		}

		return $line_counter;
	}

	function reports_grandtotal($pdf,$grandtotal_balance, $user, $position,$line_counter)
	{
		

		$pdf->SetFont('Arial','',8);

		$counter      = $this->line_counter_check($pdf,$line_counter);
        $line_counter = $counter;

		$pdf->ln(6);
		$pdf->Cell(140,0,'',0,'L');
		$pdf->Cell(0,0,'==============================',0,'L');
		$pdf->ln(4);



		$pdf->SetFont('Arial','B',9);
		$pdf->Cell(140,0,'',0,'L');
		$pdf->Cell(0,0,'GRAND TOTAL : '.number_format($grandtotal_balance, 2),0,0,'L');	
		$pdf->ln(3.5);

		$pdf->SetFont('Arial','',8);
		$pdf->Cell(140,0,'',0,'L');
		$pdf->Cell(0,0,'==============================',0,'L');
		$pdf->ln(5); 

		$pdf->SetFont('Arial','',9);
		$pdf->ln(3);
		$pdf->Cell(0,0,'Prepared By:                                                                                                    Audited By: _________________________',0,0,'L');		
		$pdf->ln(8);
		$pdf->Cell(0,0,$user,0,0,'L');
		$pdf->ln(5);
		$pdf->Cell(0,0,$position,0,0,'L');
		$pdf->ln(5);

		$pdf->AddPage();

		$line_counter += 17;

		return $line_counter;
	}



	/*
  		MultiCell(float w, float h, string txt , border , align , boolean )


		w
		    Width of cells. If 0, they extend up to the right margin of the page. 
		h
		    Height of cells. 
		txt
		    String to print. 
		border
		    Indicates if borders must be drawn around the cell block. The value can be either a number:

		        0: no border
		        1: frame

		    or a string containing some or all of the following characters (in any order):

		        L: left
		        T: top
		        R: right
		        B: bottom

		    Default value: 0. 
		align
		    Sets the text alignment. Possible values are:

		        L: left alignment
		        C: center
		        R: right alignment
		        J: justification (default value)

		fill
		    Indicates if the cell background must be painted (true) or transparent (false). Default value: false. 
    */

}