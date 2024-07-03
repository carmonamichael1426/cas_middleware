<?php

function date_helper_frequency($frequency, $cutoff, $terms){
	$start_date = array();

	if($frequency == 1):

		if(date('d', strtotime($cutoff)) == '30' || date('d', strtotime($cutoff)) == '28'):
			$start = date('Y-m-15', strtotime('+1 month', strtotime($cutoff)));
		elseif(date('d', strtotime($cutoff)) == '05'):
			$start = date('Y-m-20', strtotime($cutoff));
		else:
			$start = $cutoff;
		endif;

		for ($i=0; $i < $terms ; $i++):
			if($i == 0):
				$start_date[] = date('Y-m-d', strtotime($start));
			else:
				$start_date[] = date('Y-m-d', strtotime('+'.$i.' month', strtotime($start)));
			endif;
		endfor;

	elseif($frequency == 2):

		if(date('d', strtotime($cutoff)) == '15'):
			if(date('m', strtotime($cutoff)) == '02'):
				$start = date('Y-m-d', strtotime('last day of this month', strtotime($cutoff)));
			else:
				$start = date('Y-m-30', strtotime($cutoff));
			endif;
		elseif(date('d', strtotime($cutoff)) == '20'):
			$start = date('Y-m-05', strtotime('+1 month', strtotime($cutoff)));
		else:
			$start = $cutoff;
		endif;

		for ($i=0; $i < $terms ; $i++):
			if($i == 0):
				$start_date[] = date('Y-m-d', strtotime($start));
			else:
				$freq_2 = array('30','05');
				if(!in_array(date('d', strtotime('+'.$i.' month', strtotime($start))), $freq_2)):
					$march = date('Y-m-d', strtotime('+'.$i.' month', strtotime($start)));
					$feb   = date('Y-m-d', strtotime('-1 month', strtotime($march)));
					$start_date[] = date('Y-m-d', strtotime('last day of this month', strtotime($feb)));
				else:
					$start_date[] = date('Y-m-d', strtotime('+'.$i.' month', strtotime($start)));
				endif;
			endif;
		endfor;

	elseif($frequency == 3):

		$start = $cutoff;
		$fifteen_thirty = array('15','30','28','29');
		$five_twenty 	= array('05','20');

		for ($i=0; $i < $terms ; $i++):
			$days = abs(15*$i);
			if($i == 0):
				$start_date[] = date('Y-m-d', strtotime($start));
			else:
				if(in_array(date('d', strtotime($start)), $fifteen_thirty)):
					if(date('d', strtotime($start)) == '15'):
						if(date('m', strtotime($start)) == '02'):
							$start_date[] = date('Y-m-d', strtotime('last day of this month', strtotime($start)));
							$start = date('Y-m-d', strtotime('last day of this month', strtotime($start)));
						else:
							$start_date[] = date('Y-m-30', strtotime($start));
							$start = date('Y-m-30', strtotime($start));
						endif;
					else:
						if(date('m', strtotime($start)) == '01'):
							$start_date[] = date('Y-02-15', strtotime($start));
							$start = date('Y-02-15', strtotime($start));
						else:
							$start_date[] = date('Y-m-15', strtotime('+1 month', strtotime($start)));
							$start = date('Y-m-15', strtotime('+1 month', strtotime($start)));
						endif;
					endif;
				else:
					if(date('d', strtotime($start)) == '05'):
						$start_date[] = date('Y-m-20', strtotime($start));
						$start = date('Y-m-20', strtotime($start));
					else:
						$start_date[] = date('Y-m-05', strtotime('+1 month', strtotime($start)));
						$start = date('Y-m-05', strtotime('+1 month', strtotime($start)));
					endif;
				endif;
			endif;
		endfor;
		
	endif;

	return $start_date;
}