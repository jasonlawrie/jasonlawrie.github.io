package com.jasonlawrie;

import java.util.ArrayList;
import java.util.List;

import com.jasonlawrie.theory.GuitarClosedTriad;
import com.jasonlawrie.theory.GuitarString;
import com.jasonlawrie.theory.Key;
import com.jasonlawrie.theory.PrintMusic;

public class TestProgram {
	public static void main(String[] args) {
		
//		Example code for unicode musical symbols
//		9837 - flat
//		9838 - natural
//		9839 - sharp
//		String c = new StringBuilder().appendCodePoint(9839).toString();
//		String b = new StringBuilder().appendCodePoint(0x1D110).toString();
//		System.out.println(b+c);
		Key myKey = new Key("E","flat");
		
		myKey.printKeyNotes();
		myKey.printFrets();
		
		int fretCount=16;
		
		
		
		GuitarString[] guitarString = new GuitarString[6];
		
		
		guitarString[0] = new GuitarString("E",6,-5,fretCount,myKey);
		guitarString[1] = new GuitarString("A",5,0,fretCount,myKey);
		guitarString[2] = new GuitarString("D",4,5,fretCount,myKey);
		guitarString[3] = new GuitarString("G",3,10,fretCount,myKey);
		guitarString[4] = new GuitarString("B",2,14,fretCount,myKey);
		guitarString[5] = new GuitarString("E",1,19,fretCount,myKey);
		
//		for(GuitarString strang:guitarString) {
//			strang.printFrets();
//		}

		
		GuitarClosedTriad triad = new GuitarClosedTriad(myKey,myKey.getNotes()[1],0,guitarString,4);
		PrintMusic.tab(triad.getChordFret());
		triad.setInversion(1);
		PrintMusic.tab(triad.getChordFret());
		triad.setInversion(2);
		PrintMusic.tab(triad.getChordFret());
		
	}
}
