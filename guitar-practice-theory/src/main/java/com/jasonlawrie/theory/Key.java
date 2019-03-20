package com.jasonlawrie.theory;

public class Key {
	
//  -._.-"""-.-"""-..-"""-.-"""-.-"""-.-"""-.-"""-.-"""-.-"""-.-"""-.-"""-.-"""-.-"""-.-"""-.-"""-._.-"-'
//  =. _'.    '.    '.     '.    '.    '.    '.    '.    '.    '.    '.    '.    '.    '.    '.    '. -'_
// .-'.-. \ declare data members: the base note and the intervals between notes (in the natural scale?)    
//  .-'-__.'.___.'.___.'.____.'.___.'.___.'.___.'.___.'.___.'.___.'.___.'.___.'.___.'.___.'.___.'.___.'._-.
//   .-'
	
	
	private String bass;
	private String modifier;
	private String alphabet = "ABCDEFGABCDEFG";
	private String chromatic = "A BC D EF G A BC D EF G A";
	private String notes="";
	private int startIndex = 0;
	private int majorInterval[]= {2,2,1,2,2,2,1};
	private String sharp = new StringBuilder().appendCodePoint(9839).toString();
	private String flat = new StringBuilder().appendCodePoint(9837).toString();
	private String dbSharp = new StringBuilder().appendCodePoint(0x1D12A).toString();
	private String dbFlat = new StringBuilder().appendCodePoint(0x1D12B).toString();
	private Note[] keyNotes2 = new Note[7];
	
//                                          ________  h___
//   __        __      _____       ___     |        | |  L|_
// _/ L\__   _| L\__  |    L\_   _/  L\__  |        |_|     |
//'-o---o-' '-o---o-' '-O---O-' '=o----o-' '-OO----`OO----O-'
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^	
//    Constructors
	
	public Key(String bass) {
		this.bass=bass;
		this.modifier="";
		this.setNotes();
		this.setHundredCentsFromA2s();
	}
	
	public Key(String bass, String modifier) {
		this.bass=bass;
		this.modifier=modifier;
		this.setNotes();
		this.setHundredCentsFromA2s();
	}
	
	
	private void setNotes() {

		notes=alphabet.substring(alphabet.toLowerCase().indexOf(bass.toLowerCase()),alphabet.toLowerCase().indexOf(bass.toLowerCase())+7);
		
		//System.out.println(notes);
		
		startIndex = chromatic.toLowerCase().indexOf(bass.toLowerCase());
		if(modifier.toLowerCase().equals("flat")) {
			modifier=flat;
			startIndex--;
		} else if(modifier.toLowerCase().equals("sharp")) {
			modifier=sharp;
			startIndex++;
		}
		
		int nextStart=startIndex;
		
		for(int i=0;i<keyNotes2.length;i++) {
			keyNotes2[i]=new Note();
		}
		keyNotes2[0].setName(bass+modifier);
		
		
		for(int i=1;i<notes.length();i++) {
			//chromatic.indexOf(notes.charAt(i)); 	**this value is the index of the next natural note
			//majorInterval[i-1]; 					**this value is the index of the next note
			//										**If the same, set the next keyNote to equal the next natural note, and move the starting position of the chromatic scale 
			if(chromatic.indexOf(notes.charAt(i),nextStart)-nextStart==majorInterval[i-1]) {
				keyNotes2[i].setName(""+notes.charAt(i));
			} else if(chromatic.indexOf(notes.charAt(i),nextStart)-nextStart==majorInterval[i-1]-1) {
				keyNotes2[i].setName(""+notes.charAt(i)+sharp);
			}else if(chromatic.indexOf(notes.charAt(i),nextStart)-nextStart==majorInterval[i-1]+1) {
				keyNotes2[i].setName(""+notes.charAt(i)+flat);
			}else if(chromatic.indexOf(notes.charAt(i),nextStart)-nextStart==majorInterval[i-1]+2) {
				keyNotes2[i].setName(""+notes.charAt(i)+dbFlat);
			}else if(chromatic.indexOf(notes.charAt(i),nextStart)-nextStart==majorInterval[i-1]-2) {
				keyNotes2[i].setName(""+notes.charAt(i)+dbSharp);
			}
			nextStart+=majorInterval[i-1];
		}
	}	
	
	private void setHundredCentsFromA2s() {

			keyNotes2[0].setHundredCentsFromA2(startIndex);

		for(int i = 1; i<7; i++) {
			keyNotes2[i].setHundredCentsFromA2(majorInterval[i-1]+keyNotes2[i-1].getHundredCentsFromA2());
		}
	}
	
	public void printFrets() {
		for(int i=0;i<keyNotes2.length;i++) {
			System.out.print(keyNotes2[i].getHundredCentsFromA2()+" ");
		}
		System.out.println();
	}
	
	public void printKeyNotes() {
		for(int i=0;i<keyNotes2.length;i++) {
			System.out.print(keyNotes2[i].getName()+" ");
		}
		System.out.println();
	}
	public Note[] getNotes() {
		return keyNotes2;
	}
}
